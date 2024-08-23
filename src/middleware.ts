// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  const { pathname } = req.nextUrl;

  const userProtectedRoutes = /^\/dashboard(\/.*)?$/;
  const userTestProtectedRoutes = /^\/dashboard\/my-tests\/test(\/.*)?$/;
  const adminProtectedRoutes = /^\/admin(\/.*)?$/;
  const adminApiProtectedRoutes = /^\/api\/admin(\/.*)?$/;
  const signIn = "/sign-in";
  const signUp = "/sign-up";
  const adminSignIn = "/admin/sign-in";

  if (
    pathname.startsWith(adminSignIn) ||
    pathname.startsWith(signIn) ||
    pathname.startsWith(signUp)
  ) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else if (userTestProtectedRoutes.test(pathname)) {
    if (
      token &&
      (token.role === "User" || token.role === "Admin") &&
      token.isVerified
    ) {
      try {
        const id = req.nextUrl.searchParams.get("id");
        const dataOrder = await axios.get(
          `${process.env.BASE_URL}/api/verify-order/${id}/${token.email}`
        );
        if (dataOrder.status) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } catch (error) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  } else if (userProtectedRoutes.test(pathname)) {
    if (
      token &&
      (token.role === "User" || token.role === "Admin") &&
      token.isVerified
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  } else if (adminProtectedRoutes.test(pathname)) {
    if (token && token.role === "Admin" && token.isVerified) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin/sign-in", req.url));
    }
  } else if (adminApiProtectedRoutes.test(pathname)) {
    if (token && token.role === "Admin" && token.isVerified) {
      return NextResponse.next();
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "Authentication failed.",
        },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.next();
  }
}
