import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protects all routes under /account
    "/account/:path*",
    // Ensures middleware runs for all API routes (including trpc if used)
    "/(api|trpc)(.*)",
    // Exclude Next.js internals and static files
    "/((?!_next/static|favicon.ico|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
