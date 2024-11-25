export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export interface UserInformationResponseDto {
  userRole: UserRole;
  profilePictureBase64: string;
}
