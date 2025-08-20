// Generated from Swagger on 2025-08-20T12:36:23.699Z

// Creation entities query keys - shared across all resources
export const creationEntitiesKeys = {
  all: ["creation-entities"] as const,
  list: () => [...creationEntitiesKeys.all, "list"] as const,
};
