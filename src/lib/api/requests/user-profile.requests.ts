// Generated from Swagger on 2025-05-22T13:43:29.110Z
import {
  useSuspenseQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  UserInfoResponseDto,
  ErrorDto,
  UserProfileResponseDto,
  UpdateNotificationSettingsRequestDto,
  UpdateMailRequestDto,
  ResetPasswordRequestDto,
} from "../interfaces/user-profile.interface";

// Query keys for user-profile-related queries
export const userProfileKeys = {
  all: ["user-profile"] as const,
  mutation: (params?: any) =>
    [...userProfileKeys.all, "mutation", params] as const,
};

/**
 * Get user and permission Informations
 */
export function useUserProfileuserinfo() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: userProfileKeys["mutation"](undefined),
    queryFn: () => apiRequest<UserInfoResponseDto>(`/user-profile/userinfo`),
  });
}

/**
 * Non-suspense version of useUserProfileuserinfo
 */
export function useUserProfileuserinfoQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: userProfileKeys["mutation"](undefined),
    queryFn: () => apiRequest<UserInfoResponseDto>(`/user-profile/userinfo`),
  });
}

/**
 * Get own user details
 */
export function useUserProfilefind() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: userProfileKeys["mutation"](undefined),
    queryFn: () => apiRequest<UserProfileResponseDto>(`/user-profile`),
  });
}

/**
 * Non-suspense version of useUserProfilefind
 */
export function useUserProfilefindQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: userProfileKeys["mutation"](undefined),
    queryFn: () => apiRequest<UserProfileResponseDto>(`/user-profile`),
  });
}

/**
 * PATCH /user-profile
 */
export function useUserProfileupdateNotificationSettings() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateNotificationSettingsRequestDto) =>
      apiRequest<any>(`/user-profile`, "PATCH", data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
    },
  });
}

/**
 * Update email
 */
export function useUserProfileupdateEmail() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMailRequestDto) =>
      apiRequest<any>(`/user-profile/email`, "PATCH", data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
    },
  });
}

/**
 * Upload new Profile picture - Max 0,5mb
 */
export function useUserProfileuploadImage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiRequest<UserProfileResponseDto>(`/user-profile/image`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
    },
  });
}

/**
 * Delete profile picture
 */
export function useUserProfiledeleteImage() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiRequest<any>(`/user-profile/image`, "DELETE"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
    },
  });
}

/**
 * Send password reset mail
 */
export function useUserProfileresetPassword() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiRequest<any>(`/user-profile/reset-password`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
    },
  });
}

/**
 * Send password reset mail without logged in user
 */
export function useUserProfileresetPasswordByMail() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ResetPasswordRequestDto) =>
      apiRequest<any>(`/user-profile/reset-password-by-mail`, "POST", data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
    },
  });
}

/**
 * Resend email verification
 */
export function useUserProfileresendEmailVerification() {
  const { apiRequest } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiRequest<any>(`/user-profile/resend-email-verification`, "POST"),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
    },
  });
}
