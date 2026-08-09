import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const path = req.nextUrl.pathname;

  const isOnAdmin = path.startsWith("/admin");
  const isAdminLoginPage = path === "/admin/login";

  const isOnAccount = path.startsWith("/account");

  if (isOnAdmin && !isAdminLoginPage) {
    if (!isLoggedIn || role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
  }

  if (isAdminLoginPage && isLoggedIn && role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  if (isOnAccount) {
    if (!isLoggedIn || role !== "customer") {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
