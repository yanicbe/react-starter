// Generated from Swagger on 2025-05-22T13:43:29.109Z

import { UserSelectableEntityWithSmallDataResponseDto } from "./users.interface";
import { OrganizationOrEmptyCapacitySlotDto } from "./common.interface";

export interface CapacityDataResponseDto {
  currentCapacityInPercent: number;
  futureCapacitySlots: CapacityResponseDto[];
}

export interface CapacityResponseDto {
  date: string;
  freeCapacitySlots: number;
}

export interface ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

export interface UserTeamLeaderSelectableEntityPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: UserTeamLeaderSelectableEntityResponseDto[];
}

export interface UserTeamLeaderSelectableEntityResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string | null;
}

export interface UserCapacityPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: UserCapacityResponseDto[];
}

export interface UserCapacityResponseDto {
  user: UserSelectableEntityWithSmallDataResponseDto;
  slots: OrganizationOrEmptyCapacitySlotDto[];
}

export interface AverageRatingResponseDto {
  avgRating: number | null;
  avgRatingDifferenceLastMonth: number | null;
}

export interface AverageRatingGraphResponseDto {
  monthlyRatings: MonthlyRatingDto[];
  startDate: string;
  endDate: string;
}

export interface MonthlyRatingDto {
  avgRating: number | null;
  startDate: string;
  endDate: string;
}
