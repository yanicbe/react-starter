// scripts/fetch-interfaces.ts
import axios from 'axios';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const SWAGGER_URL = 'http://localhost:3001/api/swagger-json';
const INTERFACES_OUTPUT_DIR = path.resolve(__dirname, '../src/lib/api/interfaces');
const REQUESTS_OUTPUT_DIR = path.resolve(__dirname, '../src/lib/api/requests');

// Swagger schema types
interface OpenAPISchema {
  components?: {
    schemas?: Record<string, SchemaObject>;
  };
  paths?: Record<string, PathObject>;
}

// Update the SchemaObject interface to include parameter properties
interface SchemaObject {
  type?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject;
  $ref?: string;
  required?: string[];
  description?: string;
  format?: string;
  enum?: string[];
  nullable?: boolean;
  default?: any;
  example?: any;
  'x-module'?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
}

interface PathObject {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  patch?: OperationObject;
  delete?: OperationObject;
}

interface ParameterObject {
  name: string;
  in: string;
  required?: boolean;
  schema?: SchemaObject;
  description?: string;
}

interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: ParameterObject[];
  requestBody?: {
    required?: boolean;
    content?: {
      'application/json'?: {
        schema?: SchemaObject;
      };
    };
  };
  responses?: Record<string, {
    description?: string;
    content?: {
      'application/json'?: {
        schema?: SchemaObject;
      };
    };
  }>;
}

interface EndpointInfo {
  path: string;
  method: string;
  operation: OperationObject;
  requestSchema?: string;
  responseSchema?: string;
  pathParams: string[];
  queryParams: string[];
}

// Ensure output directories exist
[INTERFACES_OUTPUT_DIR, REQUESTS_OUTPUT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to convert enum value to valid TypeScript identifier
function convertToValidEnumKey(value: string): string {
  return value
    .toUpperCase() // Convert to uppercase
    .replace(/[^A-Z0-9_]/g, '_') // Replace invalid characters with underscore
    .replace(/^(\d)/, '_$1') // Prefix with underscore if starts with number
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
}

// Helper to extract schema name from $ref
function getSchemaNameFromRef(ref?: string): string | undefined {
  if (!ref) return undefined;
  return ref.split('/').pop() || undefined;
}

// Helper to generate enum name from property name and schema
function generateEnumName(propertyName: string, schemaName?: string): string {
  // Convert property name to PascalCase
  const pascalPropertyName = propertyName.charAt(0).toUpperCase() +
    propertyName.slice(1).replace(/([A-Z])/g, '$1');

  if (schemaName) {
    // Remove common suffixes to avoid redundancy
    const cleanSchemaName = schemaName
      .replace(/Dto$/, '')
      .replace(/Response$/, '')
      .replace(/Request$/, '');
    return `${cleanSchemaName}${pascalPropertyName}`;
  }

  return pascalPropertyName;
}

// Helper to convert OpenAPI types to TypeScript types
function convertType(schema: SchemaObject | undefined, propertyName?: string, parentSchemaName?: string, enumsCollector?: Map<string, string[]>): string {
  if (!schema) return 'any';

  // Handle references
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop();
    return refName || 'any';
  }

  // Handle allOf, oneOf, anyOf
  if ((schema as any).allOf && Array.isArray((schema as any).allOf)) {
    // For allOf, we typically take the first reference or merge types
    const allOfSchemas = (schema as any).allOf;
    if (allOfSchemas.length > 0) {
      // If first item is a reference, use that
      if (allOfSchemas[0].$ref) {
        const refName = allOfSchemas[0].$ref.split('/').pop();
        return refName || 'any';
      }
      // Otherwise, try to convert the first schema
      return convertType(allOfSchemas[0], propertyName, parentSchemaName, enumsCollector);
    }
  }

  if ((schema as any).oneOf && Array.isArray((schema as any).oneOf)) {
    // For oneOf, create a union type
    const oneOfSchemas = (schema as any).oneOf;
    const types = oneOfSchemas.map((s: any) => convertType(s, propertyName, parentSchemaName, enumsCollector));
    return types.join(' | ');
  }

  if ((schema as any).anyOf && Array.isArray((schema as any).anyOf)) {
    // For anyOf, create a union type (similar to oneOf)
    const anyOfSchemas = (schema as any).anyOf;
    const types = anyOfSchemas.map((s: any) => convertType(s, propertyName, parentSchemaName, enumsCollector));
    return types.join(' | ');
  }

  // Handle arrays
  if (schema.type === 'array') {
    if (schema.items) {
      return `${convertType(schema.items, propertyName, parentSchemaName, enumsCollector)}[]`;
    }
    return 'any[]';
  }

  // Handle enums - generate enum type
  if (schema.enum && schema.enum.length > 0 && propertyName && parentSchemaName) {
    const enumName = generateEnumName(propertyName, parentSchemaName);
    if (enumsCollector) {
      enumsCollector.set(enumName, schema.enum as string[]);
    }
    return enumName;
  }

  // Handle enums - inline union type for parameters
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum.map(value => `"${value}"`).join(' | ');
  }

  // Handle primitive types
  switch (schema.type) {
    case 'integer':
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'boolean':
      return 'boolean';
    case 'object':
      if (schema.properties) {
        const props = Object.entries(schema.properties)
          .map(([propName, propSchema]) => {
            const isRequired = schema.required?.includes(propName);
            const nullable = propSchema.nullable === true;
            const typeWithNull = nullable ? `${convertType(propSchema, propName, parentSchemaName, enumsCollector)} | null` : convertType(propSchema, propName, parentSchemaName, enumsCollector);
            return `  ${propName}${isRequired ? '' : '?'}: ${typeWithNull};`;
          })
          .join('\n');
        return `{\n${props}\n}`;
      }
      return 'Record<string, any>';
    default:
      return 'any';
  }
}

// Generate parameter interface from operation parameters
function generateParameterInterface(operation: OperationObject, hookName: string): { interfaceName: string; interfaceContent: string } | null {
  const queryParams = operation.parameters?.filter(p => p.in === 'query') || [];

  if (queryParams.length === 0) {
    return null;
  }

  const interfaceName = `${hookName.charAt(0).toUpperCase()}${hookName.slice(1)}Params`;

  const properties = queryParams.map(param => {
    const isRequired = param.required === true;
    const type = convertType(param.schema);
    const questionMark = isRequired ? '' : '?';

    // Add JSDoc comment for the parameter
    let propertyWithDoc = '';
    if (param.description) {
      propertyWithDoc += `  /**\n   * ${param.description}`;

      // Add additional schema information to JSDoc
      if (param.schema) {
        const constraints = [];
        if (param.schema.minimum !== undefined) constraints.push(`minimum: ${param.schema.minimum}`);
        if (param.schema.maximum !== undefined) constraints.push(`maximum: ${param.schema.maximum}`);
        if (param.schema.minLength !== undefined) constraints.push(`minLength: ${param.schema.minLength}`);
        if (param.schema.maxLength !== undefined) constraints.push(`maxLength: ${param.schema.maxLength}`);
        if (param.schema.default !== undefined) constraints.push(`default: ${param.schema.default}`);
        if (param.schema.example !== undefined) constraints.push(`example: ${param.schema.example}`);

        if (constraints.length > 0) {
          propertyWithDoc += `\n   * @constraints ${constraints.join(', ')}`;
        }
      }

      propertyWithDoc += `\n   */\n`;
    }

    propertyWithDoc += `  ${param.name}${questionMark}: ${type};`;
    return propertyWithDoc;
  }).join('\n');

  const interfaceContent = `interface ${interfaceName} {\n${properties}\n}`;

  return { interfaceName, interfaceContent };
}

// Find all references in a schema
function findReferences(schema: SchemaObject | undefined, references: Set<string> = new Set<string>()): string[] {
  if (!schema) return Array.from(references);

  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop();
    if (refName) {
      references.add(refName);
    }
  }

  // Handle allOf, oneOf, anyOf references
  const checkSchemaArray = (schemaArray: any[]) => {
    schemaArray.forEach((subSchema) => {
      findReferences(subSchema, references);
    });
  };

  if ((schema as any).allOf && Array.isArray((schema as any).allOf)) {
    checkSchemaArray((schema as any).allOf);
  }

  if ((schema as any).oneOf && Array.isArray((schema as any).oneOf)) {
    checkSchemaArray((schema as any).oneOf);
  }

  if ((schema as any).anyOf && Array.isArray((schema as any).anyOf)) {
    checkSchemaArray((schema as any).anyOf);
  }

  if (schema.type === 'array' && schema.items) {
    findReferences(schema.items, references);
  }

  if (schema.type === 'object' && schema.properties) {
    Object.values(schema.properties).forEach((prop) => {
      findReferences(prop, references);
    });
  }

  return Array.from(references);
}

// Convert schema object to interface string
function convertSchemaToInterface(schema: SchemaObject, schemaName: string, enumsCollector: Map<string, string[]>): string {
  if (schema.type === 'object' && schema.properties) {
    const properties = Object.entries(schema.properties)
      .map(([propName, propSchema]) => {
        const isRequired = schema.required?.includes(propName);
        const nullable = propSchema.nullable === true;
        const typeWithNull = nullable ? `${convertType(propSchema, propName, schemaName, enumsCollector)} | null` : convertType(propSchema, propName, schemaName, enumsCollector);
        return `  ${propName}${isRequired ? '' : '?'}: ${typeWithNull};`;
      })
      .join('\n');

    return `{\n${properties}\n}`;
  }

  return convertType(schema, undefined, schemaName, enumsCollector);
}

// Extract resource names from API paths
function extractResourceFromPath(path: string): string {
  const match = path.match(/^\/v\d+\.\d+\/([^/]+)/);
  return match ? match[1] : 'common';
}

// Extract path parameters from a path
function extractPathParams(path: string): string[] {
  const matches = path.match(/{([^}]+)}/g);
  return matches ? matches.map(match => match.slice(1, -1)) : [];
}

// Generate hook name from path and method
function generateHookName(path: string, method: string, operation: OperationObject): string {
  const resource = extractResourceFromPath(path);
  const pathSegments = path.split('/').filter(Boolean).slice(2); // Remove version and resource

  // Use operationId if available, but clean it up
  if (operation.operationId) {
    const cleanOperationId = operation.operationId.replace(/Controller_/, '');
    return `use${cleanOperationId.charAt(0).toUpperCase()}${cleanOperationId.slice(1)}`;
  }

  // Generate based on method and path
  const actionMap: Record<string, string> = {
    'get': 'get',
    'post': 'create',
    'put': 'update',
    'patch': 'update',
    'delete': 'delete'
  };

  const action = actionMap[method.toLowerCase()] || method.toLowerCase();
  const resourceName = resource.replace(/-([a-z])/g, g => g[1].toUpperCase());

  if (pathSegments.length === 0) {
    // Root resource endpoint
    return method === 'get' ? `use${resourceName.charAt(0).toUpperCase()}${resourceName.slice(1)}s` :
      `use${action.charAt(0).toUpperCase()}${action.slice(1)}${resourceName.charAt(0).toUpperCase()}${resourceName.slice(1)}`;
  } else {
    // Sub-resource endpoint
    const subResource = pathSegments.join('').replace(/{[^}]+}/g, '').replace(/-/g, '');
    const cleanSubResource = subResource.replace(/[^a-zA-Z]/g, '');
    return `use${action.charAt(0).toUpperCase()}${action.slice(1)}${cleanSubResource.charAt(0).toUpperCase()}${cleanSubResource.slice(1)}`;
  }
}

// Generate query key for an endpoint
function generateQueryKey(resource: string, path: string, method: string): string {
  const segments = path.split('/').filter(Boolean).slice(2); // Remove version and resource
  const keySegments = segments.map(segment =>
    segment.startsWith('{') ? 'detail' : segment.replace(/-/g, '_')
  );

  if (keySegments.length === 0) {
    return method === 'get' ? 'list' : 'mutation';
  }

  return keySegments.join('_');
}

// Parse endpoints from paths
function parseEndpoints(paths: Record<string, PathObject>, schemas: Record<string, SchemaObject>): Record<string, EndpointInfo[]> {
  const endpointsByResource: Record<string, EndpointInfo[]> = {};

  Object.entries(paths).forEach(([path, pathItem]) => {
    const resource = extractResourceFromPath(path);

    if (!endpointsByResource[resource]) {
      endpointsByResource[resource] = [];
    }

    const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;

    methods.forEach(method => {
      const operation = pathItem[method];
      if (!operation) return;

      // Extract request schema
      let requestSchema: string | undefined;
      if (operation.requestBody?.content?.['application/json']?.schema) {
        requestSchema = getSchemaNameFromRef(operation.requestBody.content['application/json'].schema.$ref);
      }

      // Extract response schema (from 200 response)
      let responseSchema: string | undefined;
      const successResponse = operation.responses?.['200'] || operation.responses?.['201'];
      if (successResponse?.content?.['application/json']?.schema) {
        responseSchema = getSchemaNameFromRef(successResponse.content['application/json'].schema.$ref);
      }

      // Extract parameters
      const pathParams = extractPathParams(path);
      const queryParams = operation.parameters?.filter(p => p.in === 'query').map(p => p.name) || [];

      endpointsByResource[resource].push({
        path: path.replace(/^\/v\d+\.\d+/, ''), // Remove version prefix
        method: method.toUpperCase(),
        operation,
        requestSchema,
        responseSchema,
        pathParams,
        queryParams
      });
    });
  });

  return endpointsByResource;
}

// Generate request hooks file for a resource
function generateRequestHooks(resource: string, endpoints: EndpointInfo[], resourceSchemas: Set<string>): string {
  const dashedResource = resource.includes('-') ? resource : resource.replace(/([A-Z])/g, '-$1').toLowerCase();

  let content = `// Generated from Swagger on ${new Date().toISOString()}\n`;
  content += `import { useSuspenseQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\n`;
  content += `import { useApiClient } from '../client';\n`;

  // Add imports for interfaces
  const interfaceImports = Array.from(resourceSchemas).filter(Boolean);
  if (interfaceImports.length > 0) {
    content += `import {\n`;
    content += interfaceImports.map(name => `  ${name}`).join(',\n');
    content += `\n} from '../interfaces/${dashedResource}.interface';\n`;
  }

  // Collect parameter interfaces
  const parameterInterfaces: string[] = [];

  content += `\n// Query keys for ${resource}-related queries\n`;
  content += `export const ${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys = {\n`;
  content += `  all: ['${resource}'] as const,\n`;

  // Generate query keys
  const uniqueKeys = new Set<string>();
  endpoints.forEach(endpoint => {
    const keyName = generateQueryKey(resource, endpoint.path, endpoint.method);
    uniqueKeys.add(keyName);
  });

  uniqueKeys.forEach(key => {
    const safeKey = key.replace(/-/g, '_');
    if (key === 'list') {
      content += `  lists: () => [...${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.all, 'list'] as const,\n`;
      content += `  list: (filters?: any) => [...${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.lists(), filters] as const,\n`;
    } else if (key === 'detail') {
      content += `  details: () => [...${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.all, 'detail'] as const,\n`;
      content += `  detail: (id: string) => [...${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.details(), id] as const,\n`;
    } else {
      content += `  '${safeKey}': (params?: any) => [...${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.all, '${safeKey}', params] as const,\n`;
    }
  });

  content += `};\n\n`;

  // Generate hooks for each endpoint
  endpoints.forEach(endpoint => {
    const hookName = generateHookName(endpoint.path, endpoint.method, endpoint.operation);
    const isQuery = endpoint.method === 'GET';
    const hasPathParams = endpoint.pathParams.length > 0;
    const hasQueryParams = endpoint.queryParams.length > 0;
    const hasRequestBody = endpoint.requestSchema;

    // Generate parameter interface if needed
    let parameterInterface: { interfaceName: string; interfaceContent: string } | null = null;
    if (hasQueryParams) {
      parameterInterface = generateParameterInterface(endpoint.operation, hookName);
      if (parameterInterface) {
        parameterInterfaces.push(parameterInterface.interfaceContent);
      }
    }

    // Add JSDoc comment
    content += `/**\n`;
    content += ` * ${endpoint.operation.summary || `${endpoint.method} ${endpoint.path}`}\n`;
    if (endpoint.operation.description) {
      content += ` * ${endpoint.operation.description}\n`;
    }
    content += ` */\n`;

    if (isQuery) {
      // Generate query hook
      const keyName = generateQueryKey(resource, endpoint.path, endpoint.method);
      const responseType = endpoint.responseSchema || 'any';

      // Determine parameters
      let params = '';
      let pathReplacement = endpoint.path;

      if (hasPathParams) {
        const paramTypes = endpoint.pathParams.map(param => `${param}: string`).join(', ');
        params = paramTypes;

        // Replace path parameters
        endpoint.pathParams.forEach(param => {
          pathReplacement = pathReplacement.replace(`{${param}}`, `\${${param}}`);
        });
      }

      if (hasQueryParams && parameterInterface) {
        const queryType = `params?: ${parameterInterface.interfaceName}`;
        params = params ? `${params}, ${queryType}` : queryType;
      }

      content += `export function ${hookName}(${params}) {\n`;
      content += `  const { apiRequest } = useApiClient();\n\n`;

      // Build query function
      let queryFn;
      if (hasQueryParams) {
        queryFn = `() => {
      const queryString = params ? \`?\${new URLSearchParams(params as any).toString()}\` : '';
      return apiRequest<${responseType}>(\`${pathReplacement}\${queryString}\`);
    }`;
      } else {
        queryFn = `() => apiRequest<${responseType}>(\`${pathReplacement}\`)`;
      }

      // Determine query key
      let queryKey;
      const safeKeyName = keyName.replace(/-/g, '_');
      if (keyName === 'list') {
        queryKey = hasQueryParams ?
          `${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.list(params)` :
          `${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.lists()`;
      } else if (keyName === 'detail' && hasPathParams) {
        queryKey = `${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.detail(${endpoint.pathParams[0]})`;
      } else {
        const keyParams = hasPathParams || hasQueryParams ?
          `{ ${hasPathParams ? endpoint.pathParams.join(', ') : ''}${hasPathParams && hasQueryParams ? ', ' : ''}${hasQueryParams ? '...params' : ''} }` :
          'undefined';
        queryKey = `${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys['${safeKeyName}'](${keyParams})`;
      }

      content += `  return useSuspenseQuery({\n`;
      content += `    queryKey: ${queryKey},\n`;
      content += `    queryFn: ${queryFn},\n`;
      content += `  });\n`;
      content += `}\n\n`;

      // Also generate non-suspense version
      content += `/**\n`;
      content += ` * Non-suspense version of ${hookName}\n`;
      content += ` */\n`;
      content += `export function ${hookName.replace('use', 'use')}Query(${params}) {\n`;
      content += `  const { apiRequest } = useApiClient();\n\n`;
      content += `  return useQuery({\n`;
      content += `    queryKey: ${queryKey},\n`;
      content += `    queryFn: ${queryFn},\n`;
      content += `  });\n`;
      content += `}\n\n`;

    } else {
      // Generate mutation hook
      const responseType = endpoint.responseSchema || 'any';
      const requestType = endpoint.requestSchema || 'any';

      content += `export function ${hookName}() {\n`;
      content += `  const { apiRequest } = useApiClient();\n`;
      content += `  const queryClient = useQueryClient();\n\n`;

      // Build mutation function parameters
      let mutationParams = '';
      let pathReplacement = endpoint.path;

      if (hasPathParams && hasRequestBody) {
        mutationParams = `{ ${endpoint.pathParams.map(p => `${p}`).join(', ')}, data }: { ${endpoint.pathParams.map(p => `${p}: string`).join('; ')}; data: ${requestType} }`;
        endpoint.pathParams.forEach(param => {
          pathReplacement = pathReplacement.replace(`{${param}}`, `\${${param}}`);
        });
      } else if (hasPathParams) {
        mutationParams = `{ ${endpoint.pathParams.join(', ')} }: { ${endpoint.pathParams.map(p => `${p}: string`).join('; ')} }`;
        endpoint.pathParams.forEach(param => {
          pathReplacement = pathReplacement.replace(`{${param}}`, `\${${param}}`);
        });
      } else if (hasRequestBody) {
        mutationParams = `data: ${requestType}`;
      }

      content += `  return useMutation({\n`;
      content += `    mutationFn: (${mutationParams}) => \n`;
      content += `      apiRequest<${responseType}>(\`${pathReplacement}\`, '${endpoint.method}'${hasRequestBody ? ', data' : ''}),\n`;
      content += `    onSuccess: () => {\n`;
      content += `      // Invalidate related queries\n`;
      content += `      queryClient.invalidateQueries({ queryKey: ${resource.replace(/-([a-z])/g, g => g[1].toUpperCase())}Keys.all });\n`;
      content += `    },\n`;
      content += `  });\n`;
      content += `}\n\n`;
    }
  });

  // Add parameter interfaces at the beginning (after imports)
  if (parameterInterfaces.length > 0) {
    const interfacesContent = parameterInterfaces.join('\n\n');
    const insertPoint = content.lastIndexOf('} from \'../interfaces/');
    if (insertPoint !== -1) {
      const endOfImports = content.indexOf('\n', insertPoint);
      content = content.slice(0, endOfImports + 1) + '\n' + interfacesContent + '\n' + content.slice(endOfImports + 1);
    } else {
      // Insert after client import
      const clientImportEnd = content.indexOf('import { useApiClient }');
      const endOfLine = content.indexOf('\n', clientImportEnd);
      content = content.slice(0, endOfLine + 1) + '\n' + interfacesContent + '\n' + content.slice(endOfLine + 1);
    }
  }

  return content;
}

// Main generation function
async function generateInterfaces(): Promise<void> {
  try {
    console.log('Fetching Swagger JSON...');
    const response = await axios.get<OpenAPISchema>(SWAGGER_URL);
    const swaggerData = response.data;

    if (!swaggerData.components?.schemas || !swaggerData.paths) {
      console.error('Error: Swagger schema does not contain components/schemas or paths');
      return;
    }

    const schemas = swaggerData.components.schemas;
    const paths = swaggerData.paths;

    // Parse endpoints
    const endpointsByResource = parseEndpoints(paths, schemas);

    // Generate interfaces (existing logic)
    const resourceSchemas: Record<string, Set<string>> = {};

    // Map schemas to resources based on API paths
    Object.entries(paths).forEach(([path, pathItem]) => {
      const resource = extractResourceFromPath(path);

      if (!resourceSchemas[resource]) {
        resourceSchemas[resource] = new Set<string>();
      }

      const operations = [
        pathItem.get,
        pathItem.post,
        pathItem.put,
        pathItem.patch,
        pathItem.delete
      ].filter(Boolean) as OperationObject[];

      operations.forEach(operation => {
        // Check request schema
        if (operation.requestBody?.content?.['application/json']?.schema) {
          const schema = operation.requestBody.content['application/json'].schema;
          if (schema.$ref) {
            const schemaName = getSchemaNameFromRef(schema.$ref);
            if (schemaName) {
              resourceSchemas[resource].add(schemaName);
              const schemaObj = schemas[schemaName];
              if (schemaObj) {
                findReferences(schemaObj).forEach(ref => {
                  resourceSchemas[resource].add(ref);
                });
              }
            }
          }
        }

        // Check response schemas
        if (operation.responses) {
          Object.values(operation.responses).forEach(response => {
            if (response.content?.['application/json']?.schema) {
              const schema = response.content['application/json'].schema;
              if (schema.$ref) {
                const schemaName = getSchemaNameFromRef(schema.$ref);
                if (schemaName) {
                  resourceSchemas[resource].add(schemaName);
                  const schemaObj = schemas[schemaName];
                  if (schemaObj) {
                    findReferences(schemaObj).forEach(ref => {
                      resourceSchemas[resource].add(ref);
                    });
                  }
                }
              }
            }
          });
        }
      });
    });

    // Handle orphaned schemas
    Object.keys(schemas).forEach(schemaName => {
      let assigned = false;
      Object.values(resourceSchemas).forEach(schemaSet => {
        if (schemaSet.has(schemaName)) {
          assigned = true;
        }
      });

      if (!assigned) {
        Object.keys(resourceSchemas).forEach(resource => {
          const resourceKebab = resource;
          const resourceCamel = resource.replace(/-([a-z])/g, g => g[1].toUpperCase());
          const resourcePascal = resourceCamel.charAt(0).toUpperCase() + resourceCamel.slice(1);

          if (
            schemaName.includes(resourcePascal) ||
            schemaName.toLowerCase().includes(resourceCamel) ||
            schemaName.toLowerCase().includes(resourceKebab.replace(/-/g, ''))
          ) {
            resourceSchemas[resource].add(schemaName);
            assigned = true;
          }
        });

        if (!assigned) {
          if (!resourceSchemas['common']) {
            resourceSchemas['common'] = new Set<string>();
          }
          resourceSchemas['common'].add(schemaName);
        }
      }
    });

    // Generate interface files
    for (const [resource, schemaNames] of Object.entries(resourceSchemas)) {
      if (schemaNames.size === 0) continue;

      const dashedResource = resource.includes('-') ? resource : resource.replace(/([A-Z])/g, '-$1').toLowerCase();
      const fileName = `${dashedResource}.interface.ts`;
      const filePath = path.join(INTERFACES_OUTPUT_DIR, fileName);

      let fileContent = '// Generated from Swagger on ' + new Date().toISOString() + '\n\n';

      // Collect enums for this resource
      const resourceEnums = new Map<string, string[]>();

      // Add imports from other resources
      const imports = new Set<string>();
      schemaNames.forEach(schemaName => {
        const schema = schemas[schemaName];
        if (schema) {
          const references = findReferences(schema);
          references.forEach(ref => {
            let refResource = '';
            for (const [r, s] of Object.entries(resourceSchemas)) {
              if (r !== resource && s.has(ref) && !schemaNames.has(ref)) {
                refResource = r;
                const dashedRefResource = refResource.includes('-') ? refResource : refResource.replace(/([A-Z])/g, '-$1').toLowerCase();
                imports.add(`import { ${ref} } from './${dashedRefResource}.interface';`);
                break;
              }
            }
          });
        }
      });

      if (imports.size > 0) {
        fileContent += Array.from(imports).join('\n') + '\n\n';
      }

      // First pass: collect all enums
      Array.from(schemaNames).forEach(schemaName => {
        const schema = schemas[schemaName];
        if (schema) {
          // This will populate the resourceEnums map
          convertSchemaToInterface(schema, schemaName, resourceEnums);
        }
      });

      // Add enum declarations
      if (resourceEnums.size > 0) {
        resourceEnums.forEach((enumValues, enumName) => {
          fileContent += `export enum ${enumName} {\n`;
          enumValues.forEach(value => {
            // Convert enum value to valid TypeScript identifier
            const enumKey = convertToValidEnumKey(value);
            fileContent += `  ${enumKey} = "${value}",\n`;
          });
          fileContent += `}\n\n`;
        });
      }

      // Generate interfaces
      Array.from(schemaNames).forEach(schemaName => {
        const schema = schemas[schemaName];
        if (schema) {
          fileContent += `export interface ${schemaName} ${convertSchemaToInterface(schema, schemaName, resourceEnums)}\n\n`;
        }
      });

      fs.writeFileSync(filePath, fileContent);
      console.log(`Generated interface ${filePath} with ${schemaNames.size} interfaces and ${resourceEnums.size} enums`);
    }

    // Generate request hooks files
    for (const [resource, endpoints] of Object.entries(endpointsByResource)) {
      if (endpoints.length === 0) continue;

      const dashedResource = resource.includes('-') ? resource : resource.replace(/([A-Z])/g, '-$1').toLowerCase();
      const fileName = `${dashedResource}.requests.ts`;
      const filePath = path.join(REQUESTS_OUTPUT_DIR, fileName);

      const schemaNames = resourceSchemas[resource] || new Set<string>();
      const requestContent = generateRequestHooks(resource, endpoints, schemaNames);

      fs.writeFileSync(filePath, requestContent);
      console.log(`Generated requests ${filePath} with ${endpoints.length} endpoints`);
    }

    // Format the generated files (fix glob pattern issue)
    console.log('Formatting generated files...');
    try {
      // Get all TypeScript files explicitly
      const glob = require('glob');
      const interfaceFiles = glob.sync(`${INTERFACES_OUTPUT_DIR}/*.ts`);
      const requestFiles = glob.sync(`${REQUESTS_OUTPUT_DIR}/*.ts`);
      const allFiles = [...interfaceFiles, ...requestFiles];

      if (allFiles.length > 0) {
        execSync(`npx prettier --write ${allFiles.map(f => `"${f}"`).join(' ')}`);
        console.log(`Formatted ${allFiles.length} files`);
      }
    } catch (error) {
      console.warn('Warning: Could not format files with Prettier. Is it installed?');
    }

    console.log('✅ Successfully generated TypeScript interfaces and request hooks from Swagger');
  } catch (error) {
    console.error('Failed to generate interfaces and requests:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run the generator
generateInterfaces().catch(error => {
  console.error('Failed to generate interfaces and requests:', error);
  process.exit(1);
});