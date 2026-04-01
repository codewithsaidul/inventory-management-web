export enum UserRole {
  SUPER_ADMIN = "superadmin",
  ADMIN = "ADMIN",
}



export interface UserInfo {
    name: string;
    email: string;
    role: UserRole;
}