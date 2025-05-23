// Generated from Swagger on 2025-05-22T13:43:29.118Z
import {
  useSuspenseQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  CreateOrganizationRequestDto,
  OrganizationResponseDto,
  ObjectId,
  ErrorDto,
  OrganizationNameInvitationResponseDto,
  OrganizationInvitationListPaginatedResponseDto,
  OrganizationInvitationListResponseDto,
  CreateOrganizationInvitationRequestDto,
  OrganizationInvitationResponseDto,
  OrganizationListPaginatedResponseDtoWithCountsAndEntities,
  OrganizationListPaginatedResponseDto,
  OrganizationFilterSelectableEntitiesResponseDto,
  OrganizationListEntitiesResponseDto,
  OrganizationListResponseDto,
  OrganizationDetailsResponseDto,
  EditOrganizationSelectableEntitiesResponseDto,
  CustomerUserListResponseDtoWithoutArchiveable,
  UpdateOrganizationRequestDto,
  ChangeOrganizationStatusRequestDto,
  ChangeOrganizationAssignedInternalUserRequestDto,
  UpdateUserRequestDto,
  CustomerUserResponseDto,
  OrganizationStatusSelectableOptionResponseDto,
  OrganizationSelectableEntityWithAssignmentDetailResponseDto,
} from "../interfaces/organizations.interface";

interface UseOrganizationsInternalfindInvitationsParams {
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

interface UseOrganizationsInternalfindInitialParams {
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
  /**
   * The assigned internal user id to filter for. ALL for all types, and NONE for unassigned ones
   * @constraints default: ALL, example: 60f3e3e4e7c1f1001f8b4567
   */
  assignedInternalUserId?: string;
  /**
   * The status filter used
   * @constraints default: ALL, example: ALL
   */
  status?: "ALL" | "ACTIVE" | "INACTIVE";
}

interface UseOrganizationsInternalfindParams {
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
  /**
   * The assigned internal user id to filter for. ALL for all types, and NONE for unassigned ones
   * @constraints default: ALL, example: 60f3e3e4e7c1f1001f8b4567
   */
  assignedInternalUserId?: string;
  /**
   * The status filter used
   * @constraints default: ALL, example: ALL
   */
  status?: "ALL" | "ACTIVE" | "INACTIVE";
}

// Query keys for organizations-related queries
export const organizationsKeys = {
  all: ["organizations"] as const,
  mutation: (params?: any) =>
    [...organizationsKeys.all, "mutation", params] as const,
  creation_entities: (params?: any) =>
    [...organizationsKeys.all, "creation_entities", params] as const,
  finishOnboardingAddUsersStage: (params?: any) =>
    [
      ...organizationsKeys.all,
      "finishOnboardingAddUsersStage",
      params,
    ] as const,
  finishOnboardingIntroductionVideoStage: (params?: any) =>
    [
      ...organizationsKeys.all,
      "finishOnboardingIntroductionVideoStage",
      params,
    ] as const,
  invitations_creation_entities: (params?: any) =>
    [
      ...organizationsKeys.all,
      "invitations_creation_entities",
      params,
    ] as const,
  invitations: (params?: any) =>
    [...organizationsKeys.all, "invitations", params] as const,
  invitations_detail: (params?: any) =>
    [...organizationsKeys.all, "invitations_detail", params] as const,
  initial: (params?: any) =>
    [...organizationsKeys.all, "initial", params] as const,
  details: () => [...organizationsKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationsKeys.details(), id] as const,
  detail_markAsFavorite: (params?: any) =>
    [...organizationsKeys.all, "detail_markAsFavorite", params] as const,
  detail_unmarkAsFavorite: (params?: any) =>
    [...organizationsKeys.all, "detail_unmarkAsFavorite", params] as const,
  detail_resetAdminPassword: (params?: any) =>
    [...organizationsKeys.all, "detail_resetAdminPassword", params] as const,
  detail_status: (params?: any) =>
    [...organizationsKeys.all, "detail_status", params] as const,
  detail_assignedInternalUser: (params?: any) =>
    [...organizationsKeys.all, "detail_assignedInternalUser", params] as const,
  detail_user_detail: (params?: any) =>
    [...organizationsKeys.all, "detail_user_detail", params] as const,
  detail_user_detail_image: (params?: any) =>
    [...organizationsKeys.all, "detail_user_detail_image", params] as const,
};

/**
 * Create organization
 */
export function useOrganizationsCustomercreate() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationRequestDto) =>
      apiRequest<OrganizationResponseDto>(
        `/organizations/customer`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Find organization creation entities
 */
export function useOrganizationsCustomercreationEntities() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: organizationsKeys["creation_entities"](undefined),
    queryFn: () =>
      apiRequest<OrganizationNameInvitationResponseDto>(
        `/organizations/customer/creation-entities`,
      ),
  });
}

/**
 * Non-suspense version of useOrganizationsCustomercreationEntities
 */
export function useOrganizationsCustomercreationEntitiesQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: organizationsKeys["creation_entities"](undefined),
    queryFn: () =>
      apiRequest<OrganizationNameInvitationResponseDto>(
        `/organizations/customer/creation-entities`,
      ),
  });
}

/**
 * Finish onboarding stage for users invitation
 */
export function useOrganizationsCustomerfinishOnboardingAddUsersStage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiRequest<any>(
        `/organizations/customer/finishOnboardingAddUsersStage`,
        "PATCH",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Finish onboarding stage for the introduction video
 */
export function useOrganizationsCustomerfinishOnboardingIntroductionVideoStage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiRequest<any>(
        `/organizations/customer/finishOnboardingIntroductionVideoStage`,
        "PATCH",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Get organization invitations creation entities
 */
export function useOrganizationsInternalinvitationsCreationEntities() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: organizationsKeys["invitations_creation_entities"](undefined),
    queryFn: () =>
      apiRequest<any>(`/organizations/internal/invitations/creation-entities`),
  });
}

/**
 * Non-suspense version of useOrganizationsInternalinvitationsCreationEntities
 */
export function useOrganizationsInternalinvitationsCreationEntitiesQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: organizationsKeys["invitations_creation_entities"](undefined),
    queryFn: () =>
      apiRequest<any>(`/organizations/internal/invitations/creation-entities`),
  });
}

/**
 * Find organization invitations with pagination
 */
export function useOrganizationsInternalfindInvitations(
  params?: UseOrganizationsInternalfindInvitationsParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: organizationsKeys["invitations"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<OrganizationInvitationListPaginatedResponseDto>(
        `/organizations/internal/invitations${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useOrganizationsInternalfindInvitations
 */
export function useOrganizationsInternalfindInvitationsQuery(
  params?: UseOrganizationsInternalfindInvitationsParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: organizationsKeys["invitations"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<OrganizationInvitationListPaginatedResponseDto>(
        `/organizations/internal/invitations${queryString}`,
      );
    },
  });
}

/**
 * Invite organization
 */
export function useOrganizationsInternalcreateInvitation() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationInvitationRequestDto) =>
      apiRequest<OrganizationInvitationResponseDto>(
        `/organizations/internal/invitations`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Delete organization invitation
 */
export function useOrganizationsInternaldeleteInvitation() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/organizations/internal/invitations/${id}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Find organizations with pagination and details for initial request - ALSO USER
 */
export function useOrganizationsInternalfindInitial(
  params?: UseOrganizationsInternalfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: organizationsKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<OrganizationListPaginatedResponseDtoWithCountsAndEntities>(
        `/organizations/internal/initial${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useOrganizationsInternalfindInitial
 */
export function useOrganizationsInternalfindInitialQuery(
  params?: UseOrganizationsInternalfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: organizationsKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<OrganizationListPaginatedResponseDtoWithCountsAndEntities>(
        `/organizations/internal/initial${queryString}`,
      );
    },
  });
}

/**
 * Find organizations with pagination - ALSO USER
 */
export function useOrganizationsInternalfind(
  params?: UseOrganizationsInternalfindParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: organizationsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<OrganizationListPaginatedResponseDto>(
        `/organizations/internal${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useOrganizationsInternalfind
 */
export function useOrganizationsInternalfindQuery(
  params?: UseOrganizationsInternalfindParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: organizationsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<OrganizationListPaginatedResponseDto>(
        `/organizations/internal${queryString}`,
      );
    },
  });
}

/**
 * Find organization details
 */
export function useOrganizationsInternalfindOne(id: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: organizationsKeys.detail(id),
    queryFn: () =>
      apiRequest<OrganizationDetailsResponseDto>(
        `/organizations/internal/${id}`,
      ),
  });
}

/**
 * Non-suspense version of useOrganizationsInternalfindOne
 */
export function useOrganizationsInternalfindOneQuery(id: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: organizationsKeys.detail(id),
    queryFn: () =>
      apiRequest<OrganizationDetailsResponseDto>(
        `/organizations/internal/${id}`,
      ),
  });
}

/**
 * Update organization data
 */
export function useOrganizationsInternalupdateOrganizationData() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateOrganizationRequestDto;
    }) =>
      apiRequest<OrganizationResponseDto>(
        `/organizations/internal/${id}`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Mark organization as favorite
 */
export function useOrganizationsInternalmarkAsFavorite() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/organizations/internal/${id}/markAsFavorite`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Unmark organization as favorite
 */
export function useOrganizationsInternalunmarkAsFavorite() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/organizations/internal/${id}/unmarkAsFavorite`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Reset organizations admin password
 */
export function useOrganizationsInternalresetAdminPassword() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(
        `/organizations/internal/${id}/resetAdminPassword`,
        "POST",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Update organizations status
 */
export function useOrganizationsInternalupdateStatus() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ChangeOrganizationStatusRequestDto;
    }) =>
      apiRequest<OrganizationResponseDto>(
        `/organizations/internal/${id}/status`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Update internal assigned user
 */
export function useOrganizationsInternalupdateAssignedInternalUser() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ChangeOrganizationAssignedInternalUserRequestDto;
    }) =>
      apiRequest<OrganizationResponseDto>(
        `/organizations/internal/${id}/assignedInternalUser`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Update customer user
 */
export function useOrganizationsInternalupdateCustomerUser() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      userId,
      data,
    }: {
      organizationId: string;
      userId: string;
      data: UpdateUserRequestDto;
    }) =>
      apiRequest<CustomerUserResponseDto>(
        `/organizations/internal/${organizationId}/user/${userId}`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Upload new Profile picture for another user - Max 0,5mb
 */
export function useOrganizationsInternaluploadImage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      userId,
    }: {
      organizationId: string;
      userId: string;
    }) =>
      apiRequest<CustomerUserResponseDto>(
        `/organizations/internal/${organizationId}/user/${userId}/image`,
        "POST",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}

/**
 * Delete profile picture of another user
 */
export function useOrganizationsInternaldeleteImage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      userId,
    }: {
      organizationId: string;
      userId: string;
    }) =>
      apiRequest<CustomerUserResponseDto>(
        `/organizations/internal/${organizationId}/user/${userId}/image`,
        "DELETE",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: organizationsKeys.all });
    },
  });
}
