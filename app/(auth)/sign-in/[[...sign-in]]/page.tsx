import { SignIn, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Section */}
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or create an account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          {/* Clerk Components */}
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2
              className="animate-spin text-muted-foreground"
              aria-hidden="true"
              role="status"
            />
          </ClerkLoading>
        </div>
      </div>

      {/* Right Section */}
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image 
          src="/logo.svg" 
          alt="Logo"
          width={300} 
          height={300} 
          priority 
        />
      </div>
    </div>
  );
}
