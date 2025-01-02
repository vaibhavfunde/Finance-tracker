import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/',
  //'/api(.*)'
]); // Adjust paths as needed

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Protect the route and handle unauthorized access
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files (e.g., CSS, JS, images, etc.)
    '/((?!_next|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
