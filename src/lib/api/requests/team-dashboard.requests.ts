// Generated from Swagger on 2025-05-22T13:43:29.121Z
import {
  useSuspenseQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useApiClient } from "../client";
import {
  CapacityDataResponseDto,
  CapacityResponseDto,
  ErrorDto,
  UserTeamLeaderSelectableEntityPaginatedResponseDto,
  UserTeamLeaderSelectableEntityResponseDto,
  UserCapacityPaginatedResponseDto,
  UserCapacityResponseDto,
  AverageRatingResponseDto,
  AverageRatingGraphResponseDto,
  MonthlyRatingDto,
} from "../interfaces/team-dashboard.interface";

interface UseTeamDashboardgetTeamLeaderParams {
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

interface UseTeamDashboardgetUserCapacitiesParams {
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
   * The team leader id that the is searched for
   * @constraints example: 60f3e3e4e7c1f1001f8b4567
   */
  belongsToTeamLeaderId?: string;
  /**
   * The user that is searched for
   * @constraints minLength: 4, example: John Doe
   */
  search?: string;
}

interface UseTeamDashboardgetTotalAvgRatingGraphParams {
  /**
   * The start date of the filter
   * @constraints example: 2021-09-29T00:00:00.000Z
   */
  start?: string;
  /**
   * The end date of the filter
   * @constraints example: 2021-09-29T00:00:00.000Z
   */
  end?: string;
}

// Query keys for team-dashboard-related queries
export const teamDashboardKeys = {
  all: ["team-dashboard"] as const,
  mutation: (params?: any) =>
    [...teamDashboardKeys.all, "mutation", params] as const,
};

/**
 * Get capacity data
 */
export function useTeamDashboardgetCapacityData() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: teamDashboardKeys["mutation"](undefined),
    queryFn: () =>
      apiRequest<CapacityDataResponseDto>(`/team-dashboard/capacity`),
  });
}

/**
 * Non-suspense version of useTeamDashboardgetCapacityData
 */
export function useTeamDashboardgetCapacityDataQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: teamDashboardKeys["mutation"](undefined),
    queryFn: () =>
      apiRequest<CapacityDataResponseDto>(`/team-dashboard/capacity`),
  });
}

/**
 * Get team leaders
 */
export function useTeamDashboardgetTeamLeader(
  params?: UseTeamDashboardgetTeamLeaderParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: teamDashboardKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<UserTeamLeaderSelectableEntityPaginatedResponseDto>(
        `/team-dashboard/team-leaders${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useTeamDashboardgetTeamLeader
 */
export function useTeamDashboardgetTeamLeaderQuery(
  params?: UseTeamDashboardgetTeamLeaderParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: teamDashboardKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<UserTeamLeaderSelectableEntityPaginatedResponseDto>(
        `/team-dashboard/team-leaders${queryString}`,
      );
    },
  });
}

/**
 * Get user capacities
 */
export function useTeamDashboardgetUserCapacities(
  params?: UseTeamDashboardgetUserCapacitiesParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: teamDashboardKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<UserCapacityPaginatedResponseDto>(
        `/team-dashboard/user-capacities${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useTeamDashboardgetUserCapacities
 */
export function useTeamDashboardgetUserCapacitiesQuery(
  params?: UseTeamDashboardgetUserCapacitiesParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: teamDashboardKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<UserCapacityPaginatedResponseDto>(
        `/team-dashboard/user-capacities${queryString}`,
      );
    },
  });
}

/**
 * Get total average rating
 */
export function useTeamDashboardgetTotalAvgRating() {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: teamDashboardKeys["mutation"](undefined),
    queryFn: () =>
      apiRequest<AverageRatingResponseDto>(`/team-dashboard/average-rating`),
  });
}

/**
 * Non-suspense version of useTeamDashboardgetTotalAvgRating
 */
export function useTeamDashboardgetTotalAvgRatingQuery() {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: teamDashboardKeys["mutation"](undefined),
    queryFn: () =>
      apiRequest<AverageRatingResponseDto>(`/team-dashboard/average-rating`),
  });
}

/**
 * Get total average rating graph data
 */
export function useTeamDashboardgetTotalAvgRatingGraph(
  params?: UseTeamDashboardgetTotalAvgRatingGraphParams,
) {
  const { apiRequest } = useApiClient();

  return useSuspenseQuery({
    queryKey: teamDashboardKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<AverageRatingGraphResponseDto>(
        `/team-dashboard/average-rating-graph${queryString}`,
      );
    },
  });
}

/**
 * Non-suspense version of useTeamDashboardgetTotalAvgRatingGraph
 */
export function useTeamDashboardgetTotalAvgRatingGraphQuery(
  params?: UseTeamDashboardgetTotalAvgRatingGraphParams,
) {
  const { apiRequest } = useApiClient();

  return useQuery({
    queryKey: teamDashboardKeys["mutation"]({ ...params }),
    queryFn: () => {
      const queryString = params
        ? `?${new URLSearchParams(params as any).toString()}`
        : "";
      return apiRequest<AverageRatingGraphResponseDto>(
        `/team-dashboard/average-rating-graph${queryString}`,
      );
    },
  });
}
