// Generated from Swagger on 2025-05-22T13:43:29.107Z

export enum NotificationListKind {
  JOB_NOTIFICATION = "job-notification",
  SELF_CHECKOUT_NOTIFICATION = "self-checkout-notification",
  INACTIVE_ORGANIZATION_NOTIFICATION = "inactive-organization-notification",
}

export interface NotificationListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: NotificationListResponseDto[];
}

export interface NotificationListResponseDto {
  _id: string;
  entityId: string;
  entityName: string;
  entityIncrementId?: string | null;
  message: string;
  read: boolean;
  kind: NotificationListKind;
  createdAt: string;
  triggerUserProfilePictureUrl?: string;
}

export interface ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

export interface BannerCancellationNotificationListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: BannerCancellationNotificationListResponseDto[];
}

export interface BannerCancellationNotificationListResponseDto {
  date: string;
}
