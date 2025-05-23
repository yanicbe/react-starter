// Generated from Swagger on 2025-05-22T13:43:29.116Z
import {
  useSuspenseQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  NotificationListPaginatedResponseDto,
  NotificationListResponseDto,
  ErrorDto,
  BannerCancellationNotificationListPaginatedResponseDto,
  BannerCancellationNotificationListResponseDto,
} from "../interfaces/notifications.interface";

interface UseNotificationsfindNotificationsWithPaginationParams {
  /**
   * Notification status filter
   * @constraints default: ALL
   */
  statusFilter: "ALL" | "UNREAD";
  /**
   * The maximum amount of retrieved items per page
   * @constraints minimum: 1, maximum: 20, default: 20, example: 20
   */
  limit?: number;
  /**
   * The page number to retrieve items from.
   * @constraints minimum: 1, default: 1, example: 1
   */
  page?: number;
}

interface UseBannerCancellationNotificationsfindNotificationsWithPaginationParams {
  /**
   * The maximum amount of retrieved items per page
   * @constraints minimum: 1, maximum: 20, default: 20, example: 20
   */
  limit?: number;
  /**
   * The page number to retrieve items from.
   * @constraints minimum: 1, default: 1, example: 1
   */
  page?: number;
}

// Query keys for notifications-related queries
export const notificationsKeys = {
  all: ["notifications"] as const,
  mutation: (params?: any) =>
    [...notificationsKeys.all, "mutation", params] as const,
};

/**
 * Find notifications with pagination
 */
export function useNotificationsfindNotificationsWithPagination(
  params?: UseNotificationsfindNotificationsWithPaginationParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: notificationsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<NotificationListPaginatedResponseDto>(
        `/notifications${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useNotificationsfindNotificationsWithPagination
 */
export function useNotificationsfindNotificationsWithPaginationQuery(
  params?: UseNotificationsfindNotificationsWithPaginationParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: notificationsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<NotificationListPaginatedResponseDto>(
        `/notifications${queryString}`,
      );
    },
  });
}

/**
 * Mark all notifications as read
 */
export function useNotificationsreadNotifications() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiRequest<any>(`/notifications`, "PATCH"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
  });
}

/**
 * Find banner cancellationnotifications with pagination
 */
export function useBannerCancellationNotificationsfindNotificationsWithPagination(
  params?: UseBannerCancellationNotificationsfindNotificationsWithPaginationParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: notificationsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<BannerCancellationNotificationListPaginatedResponseDto>(
        `/notifications/cancellation${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useBannerCancellationNotificationsfindNotificationsWithPagination
 */
export function useBannerCancellationNotificationsfindNotificationsWithPaginationQuery(
  params?: UseBannerCancellationNotificationsfindNotificationsWithPaginationParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: notificationsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<BannerCancellationNotificationListPaginatedResponseDto>(
        `/notifications/cancellation${queryString}`,
      );
    },
  });
}
