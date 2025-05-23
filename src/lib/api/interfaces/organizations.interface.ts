// Generated from Swagger on 2025-05-22T13:43:29.107Z

import { UserSelectableEntityResponseDto } from "./users.interface";

export enum OrganizationOnboardingStage {
  ADD_USERS = "ADD_USERS",
  INTRODUCTION_VIDEO = "INTRODUCTION_VIDEO",
  DONE = "DONE",
}

export enum OrganizationBanReason {
  NONE = "NONE",
  PAYMENT_OVERDUE = "PAYMENT_OVERDUE",
  DEACTIVATED_BY_ADMIN = "DEACTIVATED_BY_ADMIN",
}

export enum OrganizationInvitationType {
  INTERNAL_INVITATION = "internal-invitation",
  CUSTOMER_INVITATION = "customer-invitation",
  ORGANIZATION_INVITATION = "organization-invitation",
}

export enum OrganizationFilterSelectableEntitiesStatus {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum OrganizationFilterSelectableEntitiesStatusFilterUsed {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum OrganizationDetailsOnboardingStage {
  ADD_USERS = "ADD_USERS",
  INTRODUCTION_VIDEO = "INTRODUCTION_VIDEO",
  DONE = "DONE",
}

export enum OrganizationDetailsBanReason {
  NONE = "NONE",
  PAYMENT_OVERDUE = "PAYMENT_OVERDUE",
  DEACTIVATED_BY_ADMIN = "DEACTIVATED_BY_ADMIN",
}

export enum CustomerUserListResponseDtoWithoutArchiveableCustomerRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum CustomerUserUserType {
  INTERNAL = "INTERNAL",
  CUSTOMER = "CUSTOMER",
}

export enum CustomerUserCustomerRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum OrganizationStatusSelectableOptionBanReason {
  NONE = "NONE",
  PAYMENT_OVERDUE = "PAYMENT_OVERDUE",
  DEACTIVATED_BY_ADMIN = "DEACTIVATED_BY_ADMIN",
}

export enum OrganizationStatusSelectableOptionStatusFilterCategory {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface CreateOrganizationRequestDto {
  vatId: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  country: string;
  invoiceMail: string;
}

export interface OrganizationResponseDto {
  _id: ObjectId;
  name: string;
  customerNumber: string;
  debitReference: string;
  signatureDate: string;
  vatId: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  country: string;
  invoiceMail: string;
  allowedJobsCount: number;
  onboardingStage: OrganizationOnboardingStage;
  banReason: OrganizationBanReason;
  belongsToStatus: string;
  statusDate?: string;
  lastLogin: string;
  assignedInternalUserFullName?: string;
  organizationAdminId: ObjectId;
  jobPositionIncrementId: number;
  iban: string;
  bic: string;
  phone: string;
  hasGoogleRating: boolean;
  lastInactivityNotification?: string;
  isMarkedAsFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ObjectId {}

export interface ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

export interface OrganizationNameInvitationResponseDto {
  organizationName: string;
}

export interface OrganizationInvitationListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: OrganizationInvitationListResponseDto[];
}

export interface OrganizationInvitationListResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  expiresAt?: string;
  createdAt: string;
  name: string;
  userAlreadyCreated: boolean;
  isDeleteable: boolean;
}

export interface CreateOrganizationInvitationRequestDto {
  firstName: string;
  lastName: string;
  mail: string;
  name: string;
  debitReference: string;
  signatureDate: string;
  allowedJobsCount: number;
  newCustomerDate: string;
}

export interface OrganizationInvitationResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  type: OrganizationInvitationType;
  expiresAt?: string;
  createdAt: string;
  name: string;
  debitReference: string;
  signatureDate: string;
  allowedJobsCount: number;
  newCustomerDate: string;
}

export interface OrganizationListPaginatedResponseDtoWithCountsAndEntities {
  invitationCount: number;
  selfCheckoutCount: number;
  organizations: OrganizationListPaginatedResponseDto[];
  filterSelectableEntities: OrganizationFilterSelectableEntitiesResponseDto;
  listEntities: OrganizationListEntitiesResponseDto;
}

export interface OrganizationListPaginatedResponseDto {
  limit: number;
  offset: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  count: number;
  pageCount: number;
  docs: OrganizationListResponseDto[];
}

export interface OrganizationFilterSelectableEntitiesResponseDto {
  internalUsers: UserSelectableEntityResponseDto[];
  userFilterUsed: string;
  status: OrganizationFilterSelectableEntitiesStatus[];
  statusFilterUsed: OrganizationFilterSelectableEntitiesStatusFilterUsed;
}

export interface OrganizationListEntitiesResponseDto {
  status: OrganizationStatusSelectableOptionResponseDto[];
}

export interface OrganizationListResponseDto {
  _id: ObjectId;
  name: string;
  customerNumber: string;
  belongsToStatus: string;
  statusDate?: string;
  lastLogin: string;
  assignedInternalUserFullName?: string;
  isMarkedAsFavorite: boolean;
  profilePictureUrl?: string;
  isOpenable: boolean;
  rating?: number | null;
}

export interface OrganizationDetailsResponseDto {
  name: string;
  customerNumber: string;
  debitReference: string;
  signatureDate: string;
  vatId: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  country: string;
  invoiceMail: string;
  allowedJobsCount: number;
  onboardingStage: OrganizationDetailsOnboardingStage;
  banReason: OrganizationDetailsBanReason;
  belongsToStatus: string;
  statusDate?: string;
  lastLogin: string;
  assignedInternalUserFullName?: string;
  organizationAdminId: ObjectId;
  jobPositionIncrementId: number;
  iban: string;
  bic: string;
  phone: string;
  isMarkedAsFavorite: boolean;
  selectableEntities: EditOrganizationSelectableEntitiesResponseDto;
  organizationAdmin: CustomerUserListResponseDtoWithoutArchiveable;
  organizationUsers: CustomerUserListResponseDtoWithoutArchiveable[];
}

export interface EditOrganizationSelectableEntitiesResponseDto {
  status: OrganizationStatusSelectableOptionResponseDto[];
  internalUsers: UserSelectableEntityResponseDto[];
}

export interface CustomerUserListResponseDtoWithoutArchiveable {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
  profilePictureUrl?: string | null;
  lastLogin: string;
  ownUser?: boolean;
  customerRole: CustomerUserListResponseDtoWithoutArchiveableCustomerRole;
  projectCount: number;
}

export interface UpdateOrganizationRequestDto {
  name?: string;
  debitReference?: string;
  signatureDate?: string;
  vatId?: string;
  street?: string;
  houseNumber?: string;
  postCode?: string;
  city?: string;
  country?: string;
  invoiceMail?: string;
  allowedJobsCount?: number;
  iban?: string;
  bic?: string;
  phone?: string;
}

export interface ChangeOrganizationStatusRequestDto {
  belongsToStatus: string;
  statusDate?: string;
}

export interface ChangeOrganizationAssignedInternalUserRequestDto {
  assignedInternalUserId?: string;
}

export interface UpdateUserRequestDto {
  firstName?: string;
  lastName?: string;
  mail?: string;
}

export interface CustomerUserResponseDto {
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
  userType: CustomerUserUserType;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  customerRole: CustomerUserCustomerRole;
  belongsToOrganizationId?: string;
  projectCount: number;
}

export interface OrganizationStatusSelectableOptionResponseDto {
  id: string;
  value: string;
  needsStatusDate: boolean;
  banReason: OrganizationStatusSelectableOptionBanReason;
  nextStatus?: string;
  statusFilterCategory: OrganizationStatusSelectableOptionStatusFilterCategory;
  color: string;
  icon: string;
  deleteAssignedInternalUser?: boolean;
  inactivityPossible?: boolean;
  inCancellationStatus?: boolean;
}

export interface OrganizationSelectableEntityWithAssignmentDetailResponseDto {
  _id: string;
  value: string;
  isAssigned: boolean;
}
