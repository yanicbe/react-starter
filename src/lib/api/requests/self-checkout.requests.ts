// Generated from Swagger on 2025-05-22T13:43:29.114Z
import {
  useSuspenseQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  CapacityCreationEntitiesResponseDto,
  CapacityBySlotsNeededResponseDto,
  ErrorDto,
  SelfCheckoutListPaginatedResponseDto,
  SelfCheckoutListResponseDto,
  CreateSelfCheckoutRequestDto,
  SelfCheckoutDetailsResponseDto,
  ObjectId,
  SelfCheckoutSelectableEntitiesResponseDto,
  UpdateSelfCheckoutRequestDto,
} from "../interfaces/self-checkout.interface";

interface UseSelfCheckoutgetIbanValidationParams {
  iban: string;
  bic: string;
}

interface UseSelfCheckoutgetAdminIbanValidationParams {
  iban: string;
  bic: string;
}

interface UseSelfCheckoutgetSelfCheckoutsParams {
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

// Query keys for self-checkout-related queries
export const selfCheckoutKeys = {
  all: ["self-checkout"] as const,
  mutation: (params?: any) =>
    [...selfCheckoutKeys.all, "mutation", params] as const,
  iban_validation: (params?: any) =>
    [...selfCheckoutKeys.all, "iban_validation", params] as const,
  accept: (params?: any) =>
    [...selfCheckoutKeys.all, "accept", params] as const,
  decline: (params?: any) =>
    [...selfCheckoutKeys.all, "decline", params] as const,
};

/**
 * Get capacity data
 */
export function useSelfCheckoutgetCapacityData() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: selfCheckoutKeys["mutation"](undefined),
    queryFn: () =>
      apiRequest<CapacityCreationEntitiesResponseDto>(
        `/self-checkout/capacity`,
      ),
  });
}

/**
 * Non-suspense version of useSelfCheckoutgetCapacityData
 */
export function useSelfCheckoutgetCapacityDataQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: selfCheckoutKeys["mutation"](undefined),
    queryFn: () =>
      apiRequest<CapacityCreationEntitiesResponseDto>(
        `/self-checkout/capacity`,
      ),
  });
}

/**
 * Get capacity data for future date
 */
export function useSelfCheckoutgetIbanValidation(
  params?: UseSelfCheckoutgetIbanValidationParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: selfCheckoutKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<any>(`/self-checkout/iban-validation${queryString}`);
    },
  });
}

/**
 * Non-suspense version of useSelfCheckoutgetIbanValidation
 */
export function useSelfCheckoutgetIbanValidationQuery(
  params?: UseSelfCheckoutgetIbanValidationParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: selfCheckoutKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<any>(`/self-checkout/iban-validation${queryString}`);
    },
  });
}

/**
 * Get capacity data for future date (ADMIN ONLY)
 */
export function useSelfCheckoutgetAdminIbanValidation(
  params?: UseSelfCheckoutgetAdminIbanValidationParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: selfCheckoutKeys["iban_validation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<any>(
        `/self-checkout/admin/iban-validation${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useSelfCheckoutgetAdminIbanValidation
 */
export function useSelfCheckoutgetAdminIbanValidationQuery(
  params?: UseSelfCheckoutgetAdminIbanValidationParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: selfCheckoutKeys["iban_validation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<any>(
        `/self-checkout/admin/iban-validation${queryString}`,
      );
    },
  });
}

/**
 * Get self checkouts (ADMIN ONLY)
 */
export function useSelfCheckoutgetSelfCheckouts(
  params?: UseSelfCheckoutgetSelfCheckoutsParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: selfCheckoutKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<SelfCheckoutListPaginatedResponseDto>(
        `/self-checkout${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useSelfCheckoutgetSelfCheckouts
 */
export function useSelfCheckoutgetSelfCheckoutsQuery(
  params?: UseSelfCheckoutgetSelfCheckoutsParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: selfCheckoutKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<SelfCheckoutListPaginatedResponseDto>(
        `/self-checkout${queryString}`,
      );
    },
  });
}

/**
 * Create self checkout
 */
export function useSelfCheckoutcreateSelfCheckout() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSelfCheckoutRequestDto) =>
      apiRequest<any>(`/self-checkout`, "POST", data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: selfCheckoutKeys.all });
    },
  });
}

/**
 * Get self checkout by id (ADMIN ONLY)
 */
export function useSelfCheckoutgetSelfCheckoutById(id: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: selfCheckoutKeys["mutation"]({ id }),
    queryFn: () =>
      apiRequest<SelfCheckoutDetailsResponseDto>(`/self-checkout/${id}`),
  });
}

/**
 * Non-suspense version of useSelfCheckoutgetSelfCheckoutById
 */
export function useSelfCheckoutgetSelfCheckoutByIdQuery(id: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: selfCheckoutKeys["mutation"]({ id }),
    queryFn: () =>
      apiRequest<SelfCheckoutDetailsResponseDto>(`/self-checkout/${id}`),
  });
}

/**
 * Update self checkout (ADMIN ONLY)
 */
export function useSelfCheckoutupdateSelfCheckout() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateSelfCheckoutRequestDto;
    }) =>
      apiRequest<SelfCheckoutDetailsResponseDto>(
        `/self-checkout/${id}`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: selfCheckoutKeys.all });
    },
  });
}

/**
 * Accept self checkout (ADMIN ONLY)
 */
export function useSelfCheckoutacceptSelfCheckout() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/self-checkout/${id}/accept`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: selfCheckoutKeys.all });
    },
  });
}

/**
 * Decline self checkout (ADMIN ONLY)
 */
export function useSelfCheckoutdeclineSelfCheckout() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/self-checkout/${id}/decline`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: selfCheckoutKeys.all });
    },
  });
}
