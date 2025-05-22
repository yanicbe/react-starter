import { Role } from "./utils";

export interface UserInformationResponseDto {
  userRole: Role;
  profilePictureBase64: string;
}
