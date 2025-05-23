// src/lib/api/hooks/user.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { useApiClient } from '../client';
import { UserInformationResponseDto } from '../interfaces/user.interface';

// Query keys for user-related queries
export const userKeys = {
  all: ['users'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  info: () => [...userKeys.all, 'info'] as const,
};

/**
 * Hook to get the current user information
 * Uses Suspense for loading states and context for auth/error handling
 */
export function useCurrentUser() {
  const { apiRequest } = useApiClient();

  const query = useSuspenseQuery({
    queryKey: userKeys.info(),
    queryFn: () => apiRequest<UserInformationResponseDto>('/user-profile/userinfo'),
  });

  return {
    user: query.data,
    refetch: query.refetch,
    status: query.status,
  };
}
