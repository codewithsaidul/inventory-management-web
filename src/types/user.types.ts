export enum UserRole {
  SUPER_ADMIN = "superadmin",
  ADMIN = "ADMIN",
}



export interface UserInfo {
  _id: string;
    name: string;
    email: string;
    role: UserRole;
}