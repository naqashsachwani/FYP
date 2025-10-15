import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; // ✅ use clerk-sdk-node here

export default clerkMiddleware(async (auth, req) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    // ✅ use clerkClient directly (not called as a function)
    const user = await clerkClient.users.getUser(userId);

    const adminEmails = process.env.ADMIN_EMAIL?.split(",") || [];
    const isAdmin = adminEmails.includes(user.emailAddresses[0].emailAddress);

    if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
      return new NextResponse("Access Denied", { status: 403 });
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
