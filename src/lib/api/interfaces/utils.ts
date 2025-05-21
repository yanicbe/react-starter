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

export interface MissingEntityConflictExceptionDto {
  message: string;
  error: string;
  statusCode: number;
  entity: string;
}

export interface ISidebarItem {
  title: string;
  icon: JSX.Element;
  link: string;
  end?: boolean;
  isActive?: boolean;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
}

export interface JobFileResponseDto {
  path: string;
  name: string;
}