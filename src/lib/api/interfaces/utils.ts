export interface Paginated<T> {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: T[];
}

export enum Role {
  SuperAdmin = "SUPERADMIN",
  Admin = "ADMIN",
  User = "USER",
}
