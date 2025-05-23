// Generated from Swagger on 2025-05-22T13:43:29.108Z

import { JobListInternalResponseDto } from "./common.interface";
import { OrganizationSelectableEntityWithAssignmentDetailResponseDto } from "./organizations.interface";
import { ChatMessageResponseDto } from "./common.interface";
import { JobListCustomerResponseDto } from "./common.interface";

export enum JobInternalStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export enum JobFilterSelectableEntitiesInternalStatusFilter {
  ALL = "ALL",
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
}

export enum JobFilterSelectableEntitiesInternalStatusFilterUsed {
  ALL = "ALL",
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
}

export enum MessageBelongsToUserType {
  INTERNAL_USER = "internal-user",
  CUSTOMER_USER = "customer-user",
}

export enum JobDetailsInternalStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export enum JobEditSelectableEntitiesInternalStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export enum UpdateJobStatusStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export enum LogListEvent {
  CREATED = "CREATED",
  CHANGED_STATUS = "CHANGED_STATUS",
  CHANGED_INTERNAL_NOTES = "CHANGED_INTERNAL_NOTES",
  CHANGED_DESCRIPTION = "CHANGED_DESCRIPTION",
  LINKED_FINAL_URL = "LINKED_FINAL_URL",
  SENT_MESSAGE = "SENT_MESSAGE",
  DELETED = "DELETED",
  UPLOADED_FILES = "UPLOADED_FILES",
  DELETED_FILE = "DELETED_FILE",
}

export enum LogListBelongsToUserType {
  INTERNAL_USER = "internal-user",
  CUSTOMER_USER = "customer-user",
}

export enum JobFilterSelectableEntitiesCustomerStatusFilter {
  ALL = "ALL",
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
}

export enum JobFilterSelectableEntitiesCustomerStatusFilterUsed {
  ALL = "ALL",
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
}

export enum JobDetailsCustomerStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export enum JobCustomerStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  FEEDBACK = "FEEDBACK",
  DONE = "DONE",
}

export enum ChangeJobOrderDirection {
  UP = "UP",
  DOWN = "DOWN",
}

export interface JobListPaginatedInternalResponseDtoWithListEntities {
  jobs: JobListPaginatedResponseDto;
  listEntities: JobListEntitiesResponseDto;
}

export interface JobListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: Record<string, any>[];
}

export interface JobListEntitiesResponseDto {
  notificationJobIds: string[];
}

export interface ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

export interface CreateJobInternalRequestDto {
  title: string;
  description: string;
  belongsToOrganizationId: string;
  belongsToCustomerUserId: string;
}

export interface JobInternalResponseDto {
  _id: string;
  title: string;
  description: string;
  belongsToOrganizationId: ObjectId;
  belongsToCustomerUserId: ObjectId;
  belongsToOrganizationName: string;
  jobIncrementId: string;
  finalUrl?: string;
  status: JobInternalStatus;
  internalNotes?: string;
  files: FileDetailsResponseDto[];
  dueDate?: string;
  toFinishAt?: string;
  position?: number;
  endedAt?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ObjectId {}

export interface FileDetailsResponseDto {
  name: string;
  path: string;
  size: number;
  mimetype: string;
}

export interface JobFileResponseDto {
  fileUrl: string;
}

export interface JobCreationEntitiesInternalResponseDto {
  organizations: OrganizationSelectableEntityResponseDto[];
  maxUploadSize: number;
}

export interface OrganizationSelectableEntityResponseDto {
  _id: string;
  value: string;
}

export interface JobCreationEntitiesInternalResponseDtoWithFoundOrganization {
  customerUsers: UserSelectableEntityResponseDto[];
}

export interface UserSelectableEntityResponseDto {
  _id: string;
  value: string;
}

export interface JobListPaginatedInternalResponseDtoWithEntities {
  listEntities: JobListEntitiesResponseDto;
  jobs: JobListPaginatedInternalResponseDto;
  filterSelectableEntities: JobFilterSelectableEntitiesInternalResponseDto;
}

export interface JobListPaginatedInternalResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: JobListInternalResponseDto[];
}

export interface JobFilterSelectableEntitiesInternalResponseDto {
  organizations: OrganizationSelectableEntityWithAssignmentDetailResponseDto[];
  organizationsFilterUsed: ObjectId;
  statusFilter: JobFilterSelectableEntitiesInternalStatusFilter[];
  statusFilterUsed: JobFilterSelectableEntitiesInternalStatusFilterUsed;
}

export interface ChatPaginatedResponseDtoWithChatKey {
  chat: ChatPaginatedResponseDto;
  chatKey: string;
}

export interface ChatPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: ChatMessageResponseDto[];
}

export interface CreateMessageRequestDto {
  message?: string;
}

export interface MessageResponseDto {
  _id: ObjectId;
  belongsToJobId: ObjectId;
  belongsToUserId: ObjectId;
  belongsToUserFullName: string;
  belongsToUserType: MessageBelongsToUserType;
  message?: string;
  isOwn?: boolean;
  files: FileDetailsWithPreviewResponseDto[];
  isRating: boolean;
  ratingBelongsToOrganizationId?: ObjectId;
  rating?: number;
  createdAt: string;
}

export interface FileDetailsWithPreviewResponseDto {
  name: string;
  path: string;
  size: number;
  mimetype: string;
  thumbnailUrl?: string;
}

export interface JobDetailsInternalResponseDto {
  belongsToCustomerUserFullName: string;
  maxUploadSize: number;
  title: string;
  description: string;
  belongsToOrganizationName: string;
  jobIncrementId: string;
  finalUrl?: string;
  status: JobDetailsInternalStatus;
  internalNotes?: string;
  files: FileDetailsResponseDto[];
  dueDate?: string;
  toFinishAt?: string;
  position?: number;
  endedAt?: string;
  rating?: number;
  selectableEntities: JobEditSelectableEntitiesInternalResponseDto;
  showLogs: boolean;
  filesAllowed: boolean;
  descriptionEditable: boolean;
  needsDueDateAndMessageOnStatusChangeToActive: boolean;
}

export interface JobEditSelectableEntitiesInternalResponseDto {
  status: JobEditSelectableEntitiesInternalStatus;
}

export interface UpdateJobStatusRequestDto {
  status: UpdateJobStatusStatus;
  dueDate?: string;
  message?: string;
}

export interface UpdateJobFinalUrlRequestDto {
  finalUrl?: string;
}

export interface UpdateDescriptionRequestDto {
  description?: string;
}

export interface UpdateInternalNotesRequestDto {
  internalNotes?: string;
}

export interface LogListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: LogListResponseDto;
}

export interface LogListResponseDto {
  event: LogListEvent;
  message: string;
  belongsToUserFullName: string;
  belongsToUserType: LogListBelongsToUserType;
  createdAt: string;
}

export interface JobListPaginatedCustomerResponseDtoWithListEntities {
  jobs: JobListPaginatedResponseDto;
  listEntities: JobListEntitiesResponseDto;
}

export interface CreateJobCustomerRequestDto {
  title: string;
  description: string;
}

export interface JobCreationEntitiesCustomerResponseDto {
  maxUploadSize: number;
}

export interface JobListPaginatedCustomerResponseDtoWithEntities {
  listEntities: JobListEntitiesResponseDto;
  jobs: JobListPaginatedCustomerResponseDto;
  filterSelectableEntities: JobFilterSelectableEntitiesCustomerResponseDto;
}

export interface JobListPaginatedCustomerResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: JobListCustomerResponseDto[];
}

export interface JobFilterSelectableEntitiesCustomerResponseDto {
  customerUsers: UserSelectableEntityResponseDto[];
  customerUsersFilterUsed: string;
  statusFilter: JobFilterSelectableEntitiesCustomerStatusFilter[];
  statusFilterUsed: JobFilterSelectableEntitiesCustomerStatusFilterUsed;
}

export interface RateJobRequestDto {
  rating: number;
}

export interface RatingInfoResponseDto {
  _id: string;
  ratingNumber: number;
  createdAt: string;
  updatedAt: string;
  showGoogleRating: boolean;
}

export interface JobDetailsCustomerResponseDto {
  belongsToCustomerUserFullName: string;
  maxUploadSize: number;
  title: string;
  description: string;
  belongsToOrganizationName: string;
  jobIncrementId: string;
  finalUrl?: string;
  status: JobDetailsCustomerStatus;
  files: FileDetailsResponseDto[];
  dueDate?: string;
  toFinishAt?: string;
  position?: number;
  endedAt?: string;
  rating?: number;
  selectableEntities: JobEditSelectableEntitiesCustomerResponseDto;
  filesAllowed: boolean;
  descriptionEditable: boolean;
}

export interface JobEditSelectableEntitiesCustomerResponseDto {
  reactivateEnabled: boolean;
  customerUsers: UserSelectableEntityResponseDto[];
}

export interface JobCustomerResponseDto {
  _id: string;
  title: string;
  description: string;
  belongsToOrganizationId: ObjectId;
  belongsToCustomerUserId: ObjectId;
  belongsToOrganizationName: string;
  jobIncrementId: string;
  finalUrl?: string;
  status: JobCustomerStatus;
  files: FileDetailsResponseDto[];
  dueDate?: string;
  toFinishAt?: string;
  position?: number;
  endedAt?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateBelongsToCustomerUserRequestDto {
  belongsToCustomerUserId: string;
}

export interface ChangeJobOrderRequestDto {
  direction: ChangeJobOrderDirection;
}
