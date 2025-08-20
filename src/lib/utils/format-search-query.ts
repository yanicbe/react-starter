export const formatSearchQuery = (query: any) => {
  if (!query) {
    return "";
  }

  // Filter out undefined and null values
  const filteredQuery = Object.entries(query).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  // If no valid parameters remain, return empty string
  if (Object.keys(filteredQuery).length === 0) {
    return "";
  }

  const queryString = `?${new URLSearchParams(filteredQuery as any).toString()}`;
  return queryString;
};