'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { AuthFormData } from '@/types/auth';
import { useAuth } from '@/hooks/auth';

export default function SignUpPage() {
  const router = useRouter();
  const { 
    register, 
    isLoading, 
    error, 
    registrationStatus, 
    clearAuthError, 
    resetRegStatus 
  } = useAuth();

  // Clear errors when component mounts
  useEffect(() => {
    clearAuthError();
    resetRegStatus();

    return () => {
      clearAuthError();
      resetRegStatus();
    };
  }, [clearAuthError, resetRegStatus]);

  // Redirect on successful registration
  useEffect(() => {
    if (registrationStatus === 'success') {
      const timer = setTimeout(() => {
        router.push('/auth/sign-in?registered=true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [registrationStatus, router]);

  const handleSignUp = async (data: AuthFormData) => {
    // Call register action with required fields
    const result = await register({
      email: data.email,
      password: data.password,
      is_active: true,
      is_superuser: false,
      is_verified: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-4">
            {typeof error === 'string' ? error : 'An error occurred'}
          </div>
        )}

        {registrationStatus === 'success' && (
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-4">
            <p>Registration successful! Redirecting to login...</p>
            <p className="mt-2">
              <Link href="/auth/verify-email" className="text-blue-600 hover:text-blue-800">
                Verify your email address
              </Link> to activate your account.
            </p>
          </div>
        )}

        <SignUpForm onSubmit={handleSignUp} isLoading={isLoading}>
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link 
                href="/auth/sign-in" 
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Already have an account? Sign in here
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => signIn('google')}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            <div className="text-xs text-gray-500 text-center">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </Link>
            </div>
          </div>
        </SignUpForm>
      </div>
    </div>
  );
}
