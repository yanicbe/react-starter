// Generated from Swagger on 2025-05-22T13:43:29.106Z

export enum CustomerUserListCustomerRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum CustomerInvitationType {
  INTERNAL_INVITATION = "internal-invitation",
  CUSTOMER_INVITATION = "customer-invitation",
  ORGANIZATION_INVITATION = "organization-invitation",
}

export enum InternalUserListEmployeeRole {
  INTERNAL = "INTERNAL",
  CUSTOMER = "CUSTOMER",
}

export enum InternalInvitationCreationEntitiesEmployeeRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum InternalInvitationListEmployeeRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum CreateInternalInvitationEmployeeRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum InternalInvitationType {
  INTERNAL_INVITATION = "internal-invitation",
  CUSTOMER_INVITATION = "customer-invitation",
  ORGANIZATION_INVITATION = "organization-invitation",
}

export enum InternalInvitationEmployeeRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum InternalUserUserType {
  INTERNAL = "INTERNAL",
  CUSTOMER = "CUSTOMER",
}

export enum InternalUserEmployeeRole {
  INTERNAL = "INTERNAL",
  CUSTOMER = "CUSTOMER",
}

export enum UpdateInternalUserEmployeeRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface CustomerUserListPaginatedResponseDtoWithInvitationCount {
  invitationCount: number;
  users: CustomerUserListPaginatedResponseDto;
}

export interface CustomerUserListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: CustomerUserListResponseDto[];
}

export interface ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

export interface CustomerUserListResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  profilePictureUrl?: string | null;
  lastLogin: string;
  ownUser?: boolean;
  isArchiveable: boolean;
  customerRole: CustomerUserListCustomerRole;
  projectCount: number;
}

export interface CustomerInvitationListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: CustomerInvitationListResponseDto[];
}

export interface CustomerInvitationListResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  expiresAt?: string;
  createdAt: string;
}

export interface CreateCustomerInvitationRequestDto {
  firstName: string;
  lastName: string;
  mail: string;
}

export interface CustomerInvitationResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  type: CustomerInvitationType;
  expiresAt?: string;
  createdAt: string;
  belongsToOrganizationId: ObjectId;
}

export interface ObjectId {}

export interface InternalUserListPaginatedResponseDtoWithInvitationCount {
  invitationCount: number;
  users: InternalUserListPaginatedResponseDto;
}

export interface InternalUserListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: InternalUserListResponseDto[];
}

export interface InternalUserListResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  profilePictureUrl?: string | null;
  lastLogin: string;
  ownUser?: boolean;
  isArchiveable: boolean;
  employeeRole: InternalUserListEmployeeRole;
  isArchive: boolean;
  customerCount: number;
  isTeamLeader: boolean;
  belongsToTeamLeaderFullName?: string;
  capacity: string;
  rating?: number;
}

export interface InternalInvitationCreationEntitiesResponseDto {
  employeeRoles: InternalInvitationCreationEntitiesEmployeeRoles;
}

export interface InternalInvitationListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: InternalInvitationListResponseDto[];
}

export interface InternalInvitationListResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  expiresAt?: string;
  createdAt: string;
  employeeRole: InternalInvitationListEmployeeRole;
}

export interface CreateInternalInvitationRequestDto {
  firstName: string;
  lastName: string;
  mail: string;
  employeeRole: CreateInternalInvitationEmployeeRole;
}

export interface InternalInvitationResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  type: InternalInvitationType;
  expiresAt?: string;
  createdAt: string;
  employeeRole: InternalInvitationEmployeeRole;
}

export interface UserSelectableEntityPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: UserSelectableEntityResponseDto[];
}

export interface UserSelectableEntityResponseDto {
  _id: string;
  value: string;
}

export interface InternalUserResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  email_verified: boolean;
  profilePicturePath?: string;
  profilePictureUrl?: string | null;
  appNotificationChatEnabled: boolean;
  appNotificationStatusEnabled: boolean;
  appNotificationNewJobEnabled: boolean;
  appNotificationFinalUrlEnabled: boolean;
  mailNotificationChatEnabled: boolean;
  mailNotificationStatusEnabled: boolean;
  mailNotificationNewJobEnabled: boolean;
  mailNotificationFinalUrlEnabled: boolean;
  appNotificationRatingEnabled: boolean;
  mailNotificationRatingEnabled: boolean;
  userType: InternalUserUserType;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  employeeRole: InternalUserEmployeeRole;
  isArchive: boolean;
  customerCount: number;
  isTeamLeader: boolean;
  belongsToTeamLeaderFullName?: string;
  belongsToTeamLeaderId?: string;
  capacity: string;
}

export interface UpdateInternalUserRequestDto {
  firstName?: string;
  lastName?: string;
  mail?: string;
  employeeRole?: UpdateInternalUserEmployeeRole;
  isTeamLeader?: boolean;
  belongsToTeamLeaderId?: string;
  capacity?: number;
}

export interface UserSelectableEntityWithSmallDataResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string | null;
  avgRating: number | null;
  capacity: number;
}
