// Generated from Swagger on 2025-05-22T13:43:29.111Z
import {
  useSuspenseQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  CustomerUserListPaginatedResponseDtoWithInvitationCount,
  CustomerUserListPaginatedResponseDto,
  ErrorDto,
  CustomerUserListResponseDto,
  CustomerInvitationListPaginatedResponseDto,
  CustomerInvitationListResponseDto,
  CreateCustomerInvitationRequestDto,
  CustomerInvitationResponseDto,
  ObjectId,
  InternalUserListPaginatedResponseDtoWithInvitationCount,
  InternalUserListPaginatedResponseDto,
  InternalUserListResponseDto,
  InternalInvitationCreationEntitiesResponseDto,
  InternalInvitationListPaginatedResponseDto,
  InternalInvitationListResponseDto,
  CreateInternalInvitationRequestDto,
  InternalInvitationResponseDto,
  UserSelectableEntityPaginatedResponseDto,
  UserSelectableEntityResponseDto,
  InternalUserResponseDto,
  UpdateInternalUserRequestDto,
  UserSelectableEntityWithSmallDataResponseDto,
} from "../interfaces/users.interface";

interface UseUsersCustomerfindInitialParams {
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
  /**
   * The text to search for
   * @constraints minLength: 4, example: Jobdescription
   */
  textSearch?: string;
}

interface UseUsersCustomerfindParams {
  /**
   * The text to search for
   * @constraints minLength: 4, example: Jobdescription
   */
  textSearch?: string;
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

interface UseUsersCustomerfindInvitationsParams {
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

interface UseUsersInternalfindInitialParams {
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
  /**
   * The text to search for
   * @constraints minLength: 4, example: Jobdescription
   */
  textSearch?: string;
}

interface UseUsersInternalfindParams {
  /**
   * The text to search for
   * @constraints minLength: 4, example: Jobdescription
   */
  textSearch?: string;
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

interface UseUsersInternalfindInvitationsParams {
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

interface UseUsersInternalgetTeamLeaderParams {
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

// Query keys for users-related queries
export const usersKeys = {
  all: ["users"] as const,
  initial: (params?: any) => [...usersKeys.all, "initial", params] as const,
  mutation: (params?: any) => [...usersKeys.all, "mutation", params] as const,
  detail_archive: (params?: any) =>
    [...usersKeys.all, "detail_archive", params] as const,
  detail_unarchive: (params?: any) =>
    [...usersKeys.all, "detail_unarchive", params] as const,
  invitations_creation_entities: (params?: any) =>
    [...usersKeys.all, "invitations_creation_entities", params] as const,
  invitations: (params?: any) =>
    [...usersKeys.all, "invitations", params] as const,
  invitations_onboarding: (params?: any) =>
    [...usersKeys.all, "invitations_onboarding", params] as const,
  invitations_detail: (params?: any) =>
    [...usersKeys.all, "invitations_detail", params] as const,
  teamLeader: (params?: any) =>
    [...usersKeys.all, "teamLeader", params] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
  detail_image: (params?: any) =>
    [...usersKeys.all, "detail_image", params] as const,
};

/**
 * Find customer staff users with pagination and details for initial request
 */
export function useUsersCustomerfindInitial(
  params?: UseUsersCustomerfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<CustomerUserListPaginatedResponseDtoWithInvitationCount>(
        `/users/customer/initial${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useUsersCustomerfindInitial
 */
export function useUsersCustomerfindInitialQuery(
  params?: UseUsersCustomerfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<CustomerUserListPaginatedResponseDtoWithInvitationCount>(
        `/users/customer/initial${queryString}`,
      );
    },
  });
}

/**
 * Find customer staff users with pagination
 */
export function useUsersCustomerfind(params?: UseUsersCustomerfindParams) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<CustomerUserListPaginatedResponseDto>(
        `/users/customer${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useUsersCustomerfind
 */
export function useUsersCustomerfindQuery(params?: UseUsersCustomerfindParams) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<CustomerUserListPaginatedResponseDto>(
        `/users/customer${queryString}`,
      );
    },
  });
}

/**
 * Archive customer users
 */
export function useUsersCustomerarchiveOne() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/users/customer/${id}/archive`, "PATCH"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Unarchive customer users
 */
export function useUsersCustomerunArchiveOne() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/users/customer/${id}/unarchive`, "PATCH"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Get customer staff users invitations creation entities
 */
export function useUsersCustomerinvitationsCreationEntities() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["invitations_creation_entities"](undefined),
    queryFn: () =>
      apiRequest<any>(`/users/customer/invitations/creation-entities`),
  });
}

/**
 * Non-suspense version of useUsersCustomerinvitationsCreationEntities
 */
export function useUsersCustomerinvitationsCreationEntitiesQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["invitations_creation_entities"](undefined),
    queryFn: () =>
      apiRequest<any>(`/users/customer/invitations/creation-entities`),
  });
}

/**
 * Find customer staff users invitations with pagination
 */
export function useUsersCustomerfindInvitations(
  params?: UseUsersCustomerfindInvitationsParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["invitations"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<CustomerInvitationListPaginatedResponseDto>(
        `/users/customer/invitations${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useUsersCustomerfindInvitations
 */
export function useUsersCustomerfindInvitationsQuery(
  params?: UseUsersCustomerfindInvitationsParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["invitations"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<CustomerInvitationListPaginatedResponseDto>(
        `/users/customer/invitations${queryString}`,
      );
    },
  });
}

/**
 * Invite customer staff user
 */
export function useUsersCustomercreateInvitation() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerInvitationRequestDto) =>
      apiRequest<CustomerInvitationResponseDto>(
        `/users/customer/invitations`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Find customer staff users invitations
 */
export function useUsersCustomerfindInvitationsOnboarding() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["invitations_onboarding"](undefined),
    queryFn: () => apiRequest<any>(`/users/customer/invitations/onboarding`),
  });
}

/**
 * Non-suspense version of useUsersCustomerfindInvitationsOnboarding
 */
export function useUsersCustomerfindInvitationsOnboardingQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["invitations_onboarding"](undefined),
    queryFn: () => apiRequest<any>(`/users/customer/invitations/onboarding`),
  });
}

/**
 * Invite customer staff user
 */
export function useUsersCustomercreateInvitationOnboarding() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerInvitationRequestDto) =>
      apiRequest<CustomerInvitationResponseDto>(
        `/users/customer/invitations/onboarding`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Abort customer staff user invitation
 */
export function useUsersCustomerdeleteInvitation() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/users/customer/invitations/${id}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Find internal staff users with pagination and details for initial request
 */
export function useUsersInternalfindInitial(
  params?: UseUsersInternalfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<InternalUserListPaginatedResponseDtoWithInvitationCount>(
        `/users/internal/initial${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useUsersInternalfindInitial
 */
export function useUsersInternalfindInitialQuery(
  params?: UseUsersInternalfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<InternalUserListPaginatedResponseDtoWithInvitationCount>(
        `/users/internal/initial${queryString}`,
      );
    },
  });
}

/**
 * Find internal staff users with pagination
 */
export function useUsersInternalfind(params?: UseUsersInternalfindParams) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<InternalUserListPaginatedResponseDto>(
        `/users/internal${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useUsersInternalfind
 */
export function useUsersInternalfindQuery(params?: UseUsersInternalfindParams) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<InternalUserListPaginatedResponseDto>(
        `/users/internal${queryString}`,
      );
    },
  });
}

/**
 * Archive internal staff users
 */
export function useUsersInternalarchiveOne() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/users/internal/${id}/archive`, "PATCH"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Archvie customer users
 */
export function useUsersInternalunArchiveOne() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/users/internal/${id}/unarchive`, "PATCH"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Get internal staff users invitations creation entities
 */
export function useUsersInternalinvitationsCreationEntities() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["invitations_creation_entities"](undefined),
    queryFn: () =>
      apiRequest<InternalInvitationCreationEntitiesResponseDto>(
        `/users/internal/invitations/creation-entities`,
      ),
  });
}

/**
 * Non-suspense version of useUsersInternalinvitationsCreationEntities
 */
export function useUsersInternalinvitationsCreationEntitiesQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["invitations_creation_entities"](undefined),
    queryFn: () =>
      apiRequest<InternalInvitationCreationEntitiesResponseDto>(
        `/users/internal/invitations/creation-entities`,
      ),
  });
}

/**
 * Find internal staff users invitations with pagination
 */
export function useUsersInternalfindInvitations(
  params?: UseUsersInternalfindInvitationsParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["invitations"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<InternalInvitationListPaginatedResponseDto>(
        `/users/internal/invitations${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useUsersInternalfindInvitations
 */
export function useUsersInternalfindInvitationsQuery(
  params?: UseUsersInternalfindInvitationsParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["invitations"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<InternalInvitationListPaginatedResponseDto>(
        `/users/internal/invitations${queryString}`,
      );
    },
  });
}

/**
 * Invite internal staff user
 */
export function useUsersInternalcreateInvitation() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInternalInvitationRequestDto) =>
      apiRequest<InternalInvitationResponseDto>(
        `/users/internal/invitations`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Get Teamleader with pagination
 */
export function useUsersInternalgetTeamLeader(
  params?: UseUsersInternalgetTeamLeaderParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys["teamLeader"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<UserSelectableEntityPaginatedResponseDto>(
        `/users/internal/teamLeader${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useUsersInternalgetTeamLeader
 */
export function useUsersInternalgetTeamLeaderQuery(
  params?: UseUsersInternalgetTeamLeaderParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys["teamLeader"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<UserSelectableEntityPaginatedResponseDto>(
        `/users/internal/teamLeader${queryString}`,
      );
    },
  });
}

/**
 * Get internal staff user
 */
export function useUsersInternalgetUser(id: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => apiRequest<InternalUserResponseDto>(`/users/internal/${id}`),
  });
}

/**
 * Non-suspense version of useUsersInternalgetUser
 */
export function useUsersInternalgetUserQuery(id: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => apiRequest<InternalUserResponseDto>(`/users/internal/${id}`),
  });
}

/**
 * Update internal staff user
 */
export function useUsersInternalupdateUser() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInternalUserRequestDto;
    }) =>
      apiRequest<InternalUserResponseDto>(
        `/users/internal/${id}`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Abort internal staff user invitation
 */
export function useUsersInternaldeleteInvitation() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/users/internal/invitations/${id}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Upload new Profile picture for another user - Max 0,5mb
 */
export function useUsersInternaluploadImage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<InternalUserResponseDto>(
        `/users/internal/${id}/image`,
        "POST",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

/**
 * Delete profile picture of another user
 */
export function useUsersInternaldeleteImage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<InternalUserResponseDto>(
        `/users/internal/${id}/image`,
        "DELETE",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}
