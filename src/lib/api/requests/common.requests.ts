// Generated from Swagger on 2025-05-22T13:43:29.109Z
import {
  useSuspenseQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  FutureCapacityResponseDto,
  JobListInternalResponseDto,
  ChatMessageResponseDto,
  JobListCustomerResponseDto,
  OrganizationCapacityListResponseDto,
  OrganizationOrEmptyCapacitySlotDto,
} from "../interfaces/common.interface";

// Query keys for common-related queries
export const commonKeys = {
  all: ["common"] as const,
  mutation: (params?: any) => [...commonKeys.all, "mutation", params] as const,
};

/**
 * Just a healthcheck
 */
export function useAppgetHello() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: commonKeys["mutation"](undefined),
    queryFn: () => apiRequest<any>(`/`),
  });
}

/**
 * Non-suspense version of useAppgetHello
 */
export function useAppgetHelloQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: commonKeys["mutation"](undefined),
    queryFn: () => apiRequest<any>(`/`),
  });
}
