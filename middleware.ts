import { clerkMiddleware, getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

  try {
    const client = await clerkClient();              // ← call it as a function
    const user = await client.users.getUser(userId); // ← then use client.users
    const userEmail = user.emailAddresses[0].emailAddress;

    const adminEmails = process.env.ADMIN_EMAIL?.split(",").map(e => e.trim()) || [];
    if (req.nextUrl.pathname.startsWith("/admin") && !adminEmails.includes(userEmail)) {
      return new NextResponse("Access Denied", { status: 403 });
    }
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return NextResponse.next();
});

export const config = { matcher: ["/admin/:path*", "/api/:path*"] };
