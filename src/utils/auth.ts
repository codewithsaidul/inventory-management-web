import { UserRole } from "@/types/user.types";


export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}


export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [],
}


export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [], 
}

export const isAuthRoute = (pathname: string) => {
  return /^\/login/.test(pathname);
};


export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): UserRole| "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return UserRole.SUPER_ADMIN;
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === UserRole.SUPER_ADMIN) {
    return "/dashboard";
  }

  return "/login";
};



export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}