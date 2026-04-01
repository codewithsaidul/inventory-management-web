import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./types/user.types";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  let userRole: UserRole | null = null;

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      userRole = decoded.role;
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  const isAuth = pathname.startsWith("/auth");


  if (!accessToken) {
    if (isAuth) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuth) {
    if (userRole === UserRole.SUPER_ADMIN) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (userRole !== UserRole.SUPER_ADMIN) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};