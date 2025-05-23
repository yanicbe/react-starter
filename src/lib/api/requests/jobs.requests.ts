// Generated from Swagger on 2025-05-22T13:43:29.121Z
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  ChangeJobOrderRequestDto,
  ChatPaginatedResponseDtoWithChatKey,
  CreateJobCustomerRequestDto,
  CreateJobInternalRequestDto,
  CreateMessageRequestDto,
  JobCreationEntitiesCustomerResponseDto,
  JobCreationEntitiesInternalResponseDto,
  JobCreationEntitiesInternalResponseDtoWithFoundOrganization,
  JobCustomerResponseDto,
  JobDetailsCustomerResponseDto,
  JobDetailsInternalResponseDto,
  JobFileResponseDto,
  JobInternalResponseDto,
  JobListPaginatedCustomerResponseDtoWithEntities,
  JobListPaginatedCustomerResponseDtoWithListEntities,
  JobListPaginatedInternalResponseDtoWithEntities,
  JobListPaginatedInternalResponseDtoWithListEntities,
  LogListPaginatedResponseDto,
  MessageResponseDto,
  RateJobRequestDto,
  RatingInfoResponseDto,
  UpdateBelongsToCustomerUserRequestDto,
  UpdateDescriptionRequestDto,
  UpdateInternalNotesRequestDto,
  UpdateJobFinalUrlRequestDto,
  UpdateJobStatusRequestDto
} from "../interfaces/jobs.interface";

interface UseJobsInternalfindParams {
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
   * The belongs to organization id to filter for.
   * @constraints example: 60f3e3e4e7c1f1001f8b4567
   */
  organizationId: string;
  /**
   * The status to filter for
   * @constraints default: ALL, example: ALL
   */
  statusFilter?: "ALL" | "NEW" | "ACTIVE" | "DONE";
}

interface UseJobsInternalfindInitialParams {
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
   * The status to filter for
   * @constraints default: ALL, example: ALL
   */
  statusFilter?: "ALL" | "NEW" | "ACTIVE" | "DONE";
  /**
   * The belongs to organization id to filter for.
   * @constraints example: 60f3e3e4e7c1f1001f8b4567
   */
  organizationId?: string;
}

interface UseJobsInternalfindMessagesParams {
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

interface UseJobsInternalfindLogsParams {
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

interface UseJobsCustomerfindParams {
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
   * The assigned customer user id to filter for. ALL for all customer users
   * @constraints default: ALL, example: 60f3e3e4e7c1f1001f8b4567
   */
  assignedCustomerUserId?: string;
  /**
   * The status to filter for
   * @constraints default: ALL, example: ALL
   */
  statusFilter?: "ALL" | "NEW" | "ACTIVE" | "DONE";
}

interface UseJobsCustomerfindInitialParams {
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
   * The assigned customer user id to filter for. ALL for all customer users
   * @constraints default: ALL, example: 60f3e3e4e7c1f1001f8b4567
   */
  assignedCustomerUserId?: string;
  /**
   * The status to filter for
   * @constraints default: ALL, example: ALL
   */
  statusFilter?: "ALL" | "NEW" | "ACTIVE" | "DONE";
}

interface UseJobsCustomerfindMessagesParams {
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


// Query keys for jobs-related queries
export const jobsKeys = {
  all: ["jobs"] as const,
  mutation: (params?: any) => [...jobsKeys.all, "mutation", params] as const,
  detail_files: (params?: any) =>
    [...jobsKeys.all, "detail_files", params] as const,
  detail_files_detail: (params?: any) =>
    [...jobsKeys.all, "detail_files_detail", params] as const,
  creation_entities: (params?: any) =>
    [...jobsKeys.all, "creation_entities", params] as const,
  creation_entities_detail: (params?: any) =>
    [...jobsKeys.all, "creation_entities_detail", params] as const,
  initial: (params?: any) => [...jobsKeys.all, "initial", params] as const,
  detail_messages: (params?: any) =>
    [...jobsKeys.all, "detail_messages", params] as const,
  detail_messages_detail_detail: (params?: any) =>
    [...jobsKeys.all, "detail_messages_detail_detail", params] as const,
  messages_detail: (params?: any) =>
    [...jobsKeys.all, "messages_detail", params] as const,
  details: () => [...jobsKeys.all, "detail"] as const,
  detail: (id: string) => [...jobsKeys.details(), id] as const,
  detail_notifications: (params?: any) =>
    [...jobsKeys.all, "detail_notifications", params] as const,
  detail_status: (params?: any) =>
    [...jobsKeys.all, "detail_status", params] as const,
  detail_final_url: (params?: any) =>
    [...jobsKeys.all, "detail_final_url", params] as const,
  detail_description: (params?: any) =>
    [...jobsKeys.all, "detail_description", params] as const,
  detail_internal_notes: (params?: any) =>
    [...jobsKeys.all, "detail_internal_notes", params] as const,
  detail_logs: (params?: any) =>
    [...jobsKeys.all, "detail_logs", params] as const,
  detail_logs_pdf: (params?: any) =>
    [...jobsKeys.all, "detail_logs_pdf", params] as const,
  detail_messages_detail_rating: (params?: any) =>
    [...jobsKeys.all, "detail_messages_detail_rating", params] as const,
  detail_belongs_to_customer_user: (params?: any) =>
    [...jobsKeys.all, "detail_belongs_to_customer_user", params] as const,
  detail_reactivate: (params?: any) =>
    [...jobsKeys.all, "detail_reactivate", params] as const,
  detail_position: (params?: any) =>
    [...jobsKeys.all, "detail_position", params] as const,
};

/**
 * Get jobs with pagination
 */
export function useJobsInternalfind(params?: UseJobsInternalfindParams) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedInternalResponseDtoWithListEntities>(
        `/jobs/internal${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useJobsInternalfind
 */
export function useJobsInternalfindQuery(params?: UseJobsInternalfindParams) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedInternalResponseDtoWithListEntities>(
        `/jobs/internal${queryString}`,
      );
    },
  });
}

/**
 * Create a new job (ONLY ADMIN)
 */
export function useJobsInternalcreate() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobInternalRequestDto) =>
      apiRequest<JobInternalResponseDto>(`/jobs/internal`, "POST", data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Upload files
 */
export function useJobsInternaluploadFiles() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/jobs/internal/${id}/files`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Get a file
 */
export function useJobsInternalgetFile(id: string, filePath: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_files_detail"]({ id, filePath }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(`/jobs/internal/${id}/files/${filePath}`),
  });
}

/**
 * Non-suspense version of useJobsInternalgetFile
 */
export function useJobsInternalgetFileQuery(id: string, filePath: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_files_detail"]({ id, filePath }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(`/jobs/internal/${id}/files/${filePath}`),
  });
}

/**
 * Delete a file
 */
export function useJobsInternaldeleteFile() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, filePath }: { id: string; filePath: string }) =>
      apiRequest<any>(`/jobs/internal/${id}/files/${filePath}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Get Creation entities (ONLY ADMIN)
 */
export function useJobsInternalcreationEntities() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["creation_entities"](undefined),
    queryFn: () =>
      apiRequest<JobCreationEntitiesInternalResponseDto>(
        `/jobs/internal/creation-entities`,
      ),
  });
}

/**
 * Non-suspense version of useJobsInternalcreationEntities
 */
export function useJobsInternalcreationEntitiesQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["creation_entities"](undefined),
    queryFn: () =>
      apiRequest<JobCreationEntitiesInternalResponseDto>(
        `/jobs/internal/creation-entities`,
      ),
  });
}

/**
 * Get Creation entities for found organization (ONLY ADMIN)
 */
export function useJobsInternalcreationEntitiesWithFoundOrganization(
  organizationId: string,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["creation_entities_detail"]({ organizationId }),
    queryFn: () =>
      apiRequest<JobCreationEntitiesInternalResponseDtoWithFoundOrganization>(
        `/jobs/internal/creation-entities/${organizationId}`,
      ),
  });
}

/**
 * Non-suspense version of useJobsInternalcreationEntitiesWithFoundOrganization
 */
export function useJobsInternalcreationEntitiesWithFoundOrganizationQuery(
  organizationId: string,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["creation_entities_detail"]({ organizationId }),
    queryFn: () =>
      apiRequest<JobCreationEntitiesInternalResponseDtoWithFoundOrganization>(
        `/jobs/internal/creation-entities/${organizationId}`,
      ),
  });
}

/**
 * Get jobs with pagination and filter selectable entities
 */
export function useJobsInternalfindInitial(
  params?: UseJobsInternalfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedInternalResponseDtoWithEntities>(
        `/jobs/internal/initial${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useJobsInternalfindInitial
 */
export function useJobsInternalfindInitialQuery(
  params?: UseJobsInternalfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedInternalResponseDtoWithEntities>(
        `/jobs/internal/initial${queryString}`,
      );
    },
  });
}

/**
 * Find messages with pagination
 */
export function useJobsInternalfindMessages(
  id: string,
  params?: UseJobsInternalfindMessagesParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_messages"]({ id, ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<ChatPaginatedResponseDtoWithChatKey>(
        `/jobs/internal/${id}/messages${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useJobsInternalfindMessages
 */
export function useJobsInternalfindMessagesQuery(
  id: string,
  params?: UseJobsInternalfindMessagesParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_messages"]({ id, ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<ChatPaginatedResponseDtoWithChatKey>(
        `/jobs/internal/${id}/messages${queryString}`,
      );
    },
  });
}

/**
 * Write a message with file
 */
export function useJobsInternalwriteMessageWithFile() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateMessageRequestDto }) =>
      apiRequest<MessageResponseDto>(
        `/jobs/internal/${id}/messages`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Find messages File
 */
export function useJobsInternalfindMessageFile(
  id: string,
  messageId: string,
  filePath: string,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_messages_detail_detail"]({
      id,
      messageId,
      filePath,
    }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(
        `/jobs/internal/${id}/messages/${messageId}/${filePath}`,
      ),
  });
}

/**
 * Non-suspense version of useJobsInternalfindMessageFile
 */
export function useJobsInternalfindMessageFileQuery(
  id: string,
  messageId: string,
  filePath: string,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_messages_detail_detail"]({
      id,
      messageId,
      filePath,
    }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(
        `/jobs/internal/${id}/messages/${messageId}/${filePath}`,
      ),
  });
}

/**
 * Delete a message (ONLY ADMIN)
 */
export function useJobsInternaldeleteMessage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId }: { messageId: string }) =>
      apiRequest<any>(`/jobs/internal/messages/${messageId}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Get job details
 */
export function useJobsInternalfindOne(id: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys.detail(id),
    queryFn: () =>
      apiRequest<JobDetailsInternalResponseDto>(`/jobs/internal/${id}`),
  });
}

/**
 * Non-suspense version of useJobsInternalfindOne
 */
export function useJobsInternalfindOneQuery(id: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys.detail(id),
    queryFn: () =>
      apiRequest<JobDetailsInternalResponseDto>(`/jobs/internal/${id}`),
  });
}

/**
 * Delete a job (ONLY ADMIN)
 */
export function useJobsInternaldeleteOne() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/jobs/internal/${id}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Read notifications
 */
export function useJobsInternalreadNotifications() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/jobs/internal/${id}/notifications`, "PATCH"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Update job status
 */
export function useJobsInternalupdateStatus() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateJobStatusRequestDto;
    }) =>
      apiRequest<JobInternalResponseDto>(
        `/jobs/internal/${id}/status`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Update job final URL
 */
export function useJobsInternalupdateInternalNotes() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateJobFinalUrlRequestDto;
    }) =>
      apiRequest<JobInternalResponseDto>(
        `/jobs/internal/${id}/final-url`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Update job description
 */
export function useJobsInternalupdateDescription() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDescriptionRequestDto;
    }) =>
      apiRequest<JobInternalResponseDto>(
        `/jobs/internal/${id}/description`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Update job internal notes
 */
export function useJobsInternalupdateFinalUrl() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInternalNotesRequestDto;
    }) =>
      apiRequest<JobInternalResponseDto>(
        `/jobs/internal/${id}/internal-notes`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Get logs for a job with pagination (ONLY ADMIN)
 */
export function useJobsInternalfindLogs(
  id: string,
  params?: UseJobsInternalfindLogsParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_logs"]({ id, ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<LogListPaginatedResponseDto>(
        `/jobs/internal/${id}/logs${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useJobsInternalfindLogs
 */
export function useJobsInternalfindLogsQuery(
  id: string,
  params?: UseJobsInternalfindLogsParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_logs"]({ id, ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<LogListPaginatedResponseDto>(
        `/jobs/internal/${id}/logs${queryString}`,
      );
    },
  });
}

/**
 * Print logs as PDF (ONLY ADMIN)
 */
export function useJobsInternalprintLogs(id: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_logs_pdf"]({ id }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(`/jobs/internal/${id}/logs/pdf`),
  });
}

/**
 * Non-suspense version of useJobsInternalprintLogs
 */
export function useJobsInternalprintLogsQuery(id: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_logs_pdf"]({ id }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(`/jobs/internal/${id}/logs/pdf`),
  });
}

/**
 * Get jobs with pagination
 */
export function useJobsCustomerfind(params?: UseJobsCustomerfindParams) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedCustomerResponseDtoWithListEntities>(
        `/jobs/customer${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useJobsCustomerfind
 */
export function useJobsCustomerfindQuery(params?: UseJobsCustomerfindParams) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedCustomerResponseDtoWithListEntities>(
        `/jobs/customer${queryString}`,
      );
    },
  });
}

/**
 * Create a new job
 */
export function useJobsCustomercreate() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobCustomerRequestDto) =>
      apiRequest<any>(`/jobs/customer`, "POST", data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Upload files
 */
export function useJobsCustomeruploadFiles() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/jobs/customer/${id}/files`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Get a file
 */
export function useJobsCustomergetFile(id: string, filePath: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_files_detail"]({ id, filePath }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(`/jobs/customer/${id}/files/${filePath}`),
  });
}

/**
 * Non-suspense version of useJobsCustomergetFile
 */
export function useJobsCustomergetFileQuery(id: string, filePath: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_files_detail"]({ id, filePath }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(`/jobs/customer/${id}/files/${filePath}`),
  });
}

/**
 * Delete a file
 */
export function useJobsCustomerdeleteFile() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, filePath }: { id: string; filePath: string }) =>
      apiRequest<any>(`/jobs/customer/${id}/files/${filePath}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Get Creation entities
 */
export function useJobsCustomercreationEntities() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["creation_entities"](undefined),
    queryFn: () =>
      apiRequest<JobCreationEntitiesCustomerResponseDto>(
        `/jobs/customer/creation-entities`,
      ),
  });
}

/**
 * Non-suspense version of useJobsCustomercreationEntities
 */
export function useJobsCustomercreationEntitiesQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["creation_entities"](undefined),
    queryFn: () =>
      apiRequest<JobCreationEntitiesCustomerResponseDto>(
        `/jobs/customer/creation-entities`,
      ),
  });
}

/**
 * Get jobs with pagination and filter selectable entities
 */
export function useJobsCustomerfindInitial(
  params?: UseJobsCustomerfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedCustomerResponseDtoWithEntities>(
        `/jobs/customer/initial${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useJobsCustomerfindInitial
 */
export function useJobsCustomerfindInitialQuery(
  params?: UseJobsCustomerfindInitialParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["initial"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<JobListPaginatedCustomerResponseDtoWithEntities>(
        `/jobs/customer/initial${queryString}`,
      );
    },
  });
}

/**
 * Find messages with pagination
 */
export function useJobsCustomerfindMessages(
  id: string,
  params?: UseJobsCustomerfindMessagesParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_messages"]({ id, ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<ChatPaginatedResponseDtoWithChatKey>(
        `/jobs/customer/${id}/messages${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useJobsCustomerfindMessages
 */
export function useJobsCustomerfindMessagesQuery(
  id: string,
  params?: UseJobsCustomerfindMessagesParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_messages"]({ id, ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<ChatPaginatedResponseDtoWithChatKey>(
        `/jobs/customer/${id}/messages${queryString}`,
      );
    },
  });
}

/**
 * Write a message with file
 */
export function useJobsCustomerwriteMessageWithFile() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateMessageRequestDto }) =>
      apiRequest<MessageResponseDto>(
        `/jobs/customer/${id}/messages`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Write a message
 */
export function useJobsCustomerrateMessage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      messageId,
      data,
    }: {
      id: string;
      messageId: string;
      data: RateJobRequestDto;
    }) =>
      apiRequest<RatingInfoResponseDto>(
        `/jobs/customer/${id}/messages/${messageId}/rating`,
        "POST",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Find messages File
 */
export function useJobsCustomerfindMessageFile(
  id: string,
  messageId: string,
  filePath: string,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys["detail_messages_detail_detail"]({
      id,
      messageId,
      filePath,
    }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(
        `/jobs/customer/${id}/messages/${messageId}/${filePath}`,
      ),
  });
}

/**
 * Non-suspense version of useJobsCustomerfindMessageFile
 */
export function useJobsCustomerfindMessageFileQuery(
  id: string,
  messageId: string,
  filePath: string,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys["detail_messages_detail_detail"]({
      id,
      messageId,
      filePath,
    }),
    queryFn: () =>
      apiRequest<JobFileResponseDto>(
        `/jobs/customer/${id}/messages/${messageId}/${filePath}`,
      ),
  });
}

/**
 * Get job details and selectable entities
 */
export function useJobsCustomerfindOne(id: string) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: jobsKeys.detail(id),
    queryFn: () =>
      apiRequest<JobDetailsCustomerResponseDto>(`/jobs/customer/${id}`),
  });
}

/**
 * Non-suspense version of useJobsCustomerfindOne
 */
export function useJobsCustomerfindOneQuery(id: string) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: jobsKeys.detail(id),
    queryFn: () =>
      apiRequest<JobDetailsCustomerResponseDto>(`/jobs/customer/${id}`),
  });
}

/**
 * Delete a job
 */
export function useJobsCustomerdeleteOne() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/jobs/customer/${id}`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Read notifications
 */
export function useJobsCustomerreadNotifications() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<any>(`/jobs/customer/${id}/notifications`, "PATCH"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Update job description
 */
export function useJobsCustomerupdateDescription() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDescriptionRequestDto;
    }) =>
      apiRequest<JobCustomerResponseDto>(
        `/jobs/customer/${id}/description`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Update belongs to customer user
 */
export function useJobsCustomerupdateBelongsToCustomerUser() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateBelongsToCustomerUserRequestDto;
    }) =>
      apiRequest<JobCustomerResponseDto>(
        `/jobs/customer/${id}/belongs-to-customer-user`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Reactivate a job
 */
export function useJobsCustomerreactivate() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiRequest<JobCustomerResponseDto>(
        `/jobs/customer/${id}/reactivate`,
        "PATCH",
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}

/**
 * Change job position
 */
export function useJobsCustomerchangePosition() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ChangeJobOrderRequestDto;
    }) =>
      apiRequest<JobListPaginatedCustomerResponseDtoWithListEntities>(
        `/jobs/customer/${id}/position`,
        "PATCH",
        data,
      ),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: jobsKeys.all });
    },
  });
}
