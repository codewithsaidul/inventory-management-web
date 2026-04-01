import { UserRole } from "@/types/user.types";

export const isAuthRoute = (pathname: string) => {
  return /^\/auth/.test(pathname);
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === UserRole.SUPER_ADMIN) {
    return "/management/dashboard";
  }

  return "/auth/login";
};