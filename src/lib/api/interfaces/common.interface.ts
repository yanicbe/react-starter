// Generated from Swagger on 2025-05-22T13:43:29.100Z

import { ObjectId } from "./users.interface";
import { FileDetailsWithPreviewResponseDto } from "./jobs.interface";

export enum JobListInternalStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export enum ChatMessageBelongsToUserType {
  INTERNAL_USER = "internal-user",
  CUSTOMER_USER = "customer-user",
}

export enum JobListCustomerStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export interface FutureCapacityResponseDto {
  date: string;
  freeCapacitySlots: number;
}

export interface JobListInternalResponseDto {
  profilePictureUrl?: string;
  belongsToCustomerUserFullName: string;
  _id: string;
  title: string;
  jobIncrementId: string;
  status: JobListInternalStatus;
  rating?: number;
  createdAt: string;
  isDeleteable: boolean;
  belongsToOrganizationName: string;
}

export interface ChatMessageResponseDto {
  _id: ObjectId;
  belongsToUserFullName: string;
  belongsToUserType: ChatMessageBelongsToUserType;
  message?: string;
  files: FileDetailsWithPreviewResponseDto[];
  isRating: boolean;
  rating?: number;
  createdAt: string;
  belongsToUserProfilePictureUrl?: string;
  isOwn: boolean;
}

export interface JobListCustomerResponseDto {
  profilePictureUrl?: string;
  belongsToCustomerUserFullName: string;
  _id: string;
  title: string;
  jobIncrementId: string;
  status: JobListCustomerStatus;
  rating?: number;
  createdAt: string;
  isDeleteable: boolean;
  isSortable: boolean;
}

export interface OrganizationCapacityListResponseDto {
  _id: ObjectId;
  name: string;
  belongsToStatus: string;
  statusDate?: string;
  isMarkedAsFavorite: boolean;
  rating?: number | null;
  allowedJobsCount: number;
  isOverCapacity: boolean;
}

export interface OrganizationOrEmptyCapacitySlotDto {
  isEmpty: boolean;
  organization?: OrganizationCapacityListResponseDto | null;
}
