// Generated from Swagger on 2025-08-20T12:36:23.683Z
import {
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import { creationEntitiesKeys } from "../creation-entities-keys";
import {
  UserInfoResponseDto
} from "../interfaces/user-profile.interface";

// Query keys for user-profile-related queries
export const userProfileKeys = {
  all: ["user-profile"] as const,
  userinfo: () => [...userProfileKeys.all, "userinfo"] as const,
};

/**
 * Get user and permission Informations
 */
export function useUserProfileuserinfo(
  options?: Omit<
    UseSuspenseQueryOptions<UserInfoResponseDto>,
    "queryKey" | "queryFn"
  >,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: [...userProfileKeys.userinfo(), ...creationEntitiesKeys.list()],
    queryFn: () => apiRequest<UserInfoResponseDto>(`/user-profile/userinfo`),
    // Default cache-disabling options (can be overridden via options)
    staleTime: 0,
    gcTime: 0, // replaces cacheTime in v5
    refetchOnMount: "always",
    ...options,
  });
}

/**
 * Non-suspense version of useUserProfileuserinfo
 */
export function useUserProfileuserinfoQuery(
  options?: Omit<UseQueryOptions<UserInfoResponseDto>, "queryKey" | "queryFn">,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: [...userProfileKeys.userinfo(), ...creationEntitiesKeys.list()],
    queryFn: () => apiRequest<UserInfoResponseDto>(`/user-profile/userinfo`),
    // Default cache-disabling options (can be overridden via options)
    staleTime: 0,
    gcTime: 0, // replaces cacheTime in v5
    refetchOnMount: "always",
    ...options,
  });
}
