// scripts/fetch-interfaces.ts
import axios from 'axios';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const SWAGGER_URL = 'http://localhost:3001/api/swagger-json';
const OUTPUT_DIR = path.resolve(__dirname, '../src/lib/api/interfaces');

// Swagger schema types
interface OpenAPISchema {
  components?: {
    schemas?: Record<string, SchemaObject>;
  };
  paths?: Record<string, PathObject>;
}

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
}

interface PathObject {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  patch?: OperationObject;
  delete?: OperationObject;
}

interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  requestBody?: {
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

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to extract schema name from $ref
function getSchemaNameFromRef(ref?: string): string | null {
  if (!ref) return null;
  return ref.split('/').pop() || null;
}

// Helper to convert OpenAPI types to TypeScript types
function convertType(schema: SchemaObject | undefined): string {
  if (!schema) return 'any';

  // Handle references
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop();
    return refName || 'any';
  }

  // Handle arrays
  if (schema.type === 'array') {
    if (schema.items) {
      return `${convertType(schema.items)}[]`;
    }
    return 'any[]';
  }

  // Handle enums
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum.map(value => typeof value === 'string' ? `'${value}'` : value).join(' | ');
  }

  // Handle nullable
  let typeStr = '';

  // Handle primitive types
  switch (schema.type) {
    case 'integer':
    case 'number':
      typeStr = 'number';
      break;
    case 'string':
      typeStr = 'string';
      break;
    case 'boolean':
      typeStr = 'boolean';
      break;
    case 'object':
      if (schema.properties) {
        const props = Object.entries(schema.properties)
          .map(([propName, propSchema]) => {
            const isRequired = schema.required?.includes(propName);
            const nullable = propSchema.nullable === true;
            const typeWithNull = nullable ? `${convertType(propSchema)} | null` : convertType(propSchema);
            return `  ${propName}${isRequired ? '' : '?'}: ${typeWithNull};`;
          })
          .join('\n');
        return `{\n${props}\n}`;
      }
      typeStr = 'Record<string, any>';
      break;
    default:
      typeStr = 'any';
  }

  return typeStr;
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
function convertSchemaToInterface(schema: SchemaObject): string {
  if (schema.type === 'object' && schema.properties) {
    const properties = Object.entries(schema.properties)
      .map(([propName, propSchema]) => {
        const isRequired = schema.required?.includes(propName);
        const nullable = propSchema.nullable === true;
        const typeWithNull = nullable ? `${convertType(propSchema)} | null` : convertType(propSchema);
        return `  ${propName}${isRequired ? '' : '?'}: ${typeWithNull};`;
      })
      .join('\n');

    return `{\n${properties}\n}`;
  }

  return convertType(schema);
}

// Extract resource names from API paths
function extractResourceFromPath(path: string): string {
  // Extract the first path segment after /v1.0/ as the resource name
  // For example, from "/v1.0/user-profile/userinfo" extract "user-profile"
  const match = path.match(/^\/v\d+\.\d+\/([^/]+)/);
  return match ? match[1] : 'common';
}

// Generate interfaces from Swagger schema
async function generateInterfaces(): Promise<void> {
  try {
    console.log('Fetching Swagger JSON...');
    const response = await axios.get<OpenAPISchema>(SWAGGER_URL);
    const swaggerData = response.data;

    // Process components/schemas to generate interfaces
    if (swaggerData.components?.schemas && swaggerData.paths) {
      const schemas = swaggerData.components.schemas;
      const paths = swaggerData.paths;

      // Map to store which schemas are used in which resource (path)
      const resourceSchemas: Record<string, Set<string>> = {};

      // First pass: Map schemas to resources based on API paths
      Object.entries(paths).forEach(([path, pathItem]) => {
        const resource = extractResourceFromPath(path);

        // Initialize the set if not exists
        if (!resourceSchemas[resource]) {
          resourceSchemas[resource] = new Set<string>();
        }

        // Check all HTTP methods
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

                // Add referenced schemas too
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

                    // Add referenced schemas too
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

      // Second pass: Handle schemas not directly tied to any resource
      Object.keys(schemas).forEach(schemaName => {
        let assigned = false;

        // Check if already assigned to a resource
        Object.values(resourceSchemas).forEach(schemaSet => {
          if (schemaSet.has(schemaName)) {
            assigned = true;
          }
        });

        // If not assigned, try to find a logical place based on naming
        if (!assigned) {
          // Try to match schema name with resource names
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

          // If still not assigned, put it in common
          if (!assigned) {
            if (!resourceSchemas['common']) {
              resourceSchemas['common'] = new Set<string>();
            }
            resourceSchemas['common'].add(schemaName);
          }
        }
      });

      // Third pass: Generate interface files for each resource
      for (const [resource, schemaNames] of Object.entries(resourceSchemas)) {
        if (schemaNames.size === 0) continue;

        const dashedResource = resource.includes('-') ? resource : resource.replace(/([A-Z])/g, '-$1').toLowerCase();
        const fileName = `${dashedResource}.interface.ts`;
        const filePath = path.join(OUTPUT_DIR, fileName);

        let fileContent = '// Generated from Swagger on ' + new Date().toISOString() + '\n\n';

        // Add imports from other resources
        const imports = new Set<string>();
        schemaNames.forEach(schemaName => {
          const schema = schemas[schemaName];
          if (schema) {
            const references = findReferences(schema);
            references.forEach(ref => {
              // Find which resource this ref belongs to
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

        // Add imports
        if (imports.size > 0) {
          fileContent += Array.from(imports).join('\n') + '\n\n';
        }

        // Generate interfaces
        Array.from(schemaNames).forEach(schemaName => {
          const schema = schemas[schemaName];
          if (schema) {
            fileContent += `export interface ${schemaName} ${convertSchemaToInterface(schema)}\n\n`;
          }
        });

        fs.writeFileSync(filePath, fileContent);
        console.log(`Generated ${filePath} with ${schemaNames.size} interfaces`);
      }

      // Format the generated files
      console.log('Formatting generated files...');
      try {
        execSync(`npx prettier --write "${OUTPUT_DIR}/*.ts"`);
      } catch (error) {
        console.warn('Warning: Could not format files with Prettier. Is it installed?');
      }

      console.log('✅ Successfully generated TypeScript interfaces from Swagger');
    } else {
      console.error('Error: Swagger schema does not contain components/schemas or paths');
    }
  } catch (error) {
    console.error('Failed to generate interfaces:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run the generator
generateInterfaces().catch(error => {
  console.error('Failed to generate interfaces:', error);
  process.exit(1);
});