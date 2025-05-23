// Generated from Swagger on 2025-05-22T13:43:29.105Z

export enum UserInfoUserType {
  INTERNAL = "INTERNAL",
  CUSTOMER = "CUSTOMER",
}

export enum UserInfoUserRole {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  TEAMLEADER = "TEAMLEADER",
  USER = "USER",
}

export interface UserInfoResponseDto {
  profilePictureUrl?: string | null;
  userType: UserInfoUserType;
  userRole: UserInfoUserRole;
  isTeamLeader?: boolean;
}

export interface ErrorDto {
  message: string;
  error: string;
  statusCode: number;
}

export interface UserProfileResponseDto {
  _id: string;
  firstName: string;
  lastName: string;
  mail: string;
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
}

export interface UpdateNotificationSettingsRequestDto {
  appNotificationChatEnabled?: boolean;
  appNotificationStatusEnabled?: boolean;
  appNotificationNewJobEnabled?: boolean;
  appNotificationFinalUrlEnabled?: boolean;
  mailNotificationChatEnabled?: boolean;
  mailNotificationStatusEnabled?: boolean;
  mailNotificationNewJobEnabled?: boolean;
  mailNotificationFinalUrlEnabled?: boolean;
  appNotificationRatingEnabled?: boolean;
  mailNotificationRatingEnabled?: boolean;
}

export interface UpdateMailRequestDto {
  mail: string;
}

export interface ResetPasswordRequestDto {
  mail: string;
}
