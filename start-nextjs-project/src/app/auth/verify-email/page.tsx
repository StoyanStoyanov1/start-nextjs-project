'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { EmailVerificationForm } from '@/components/auth/EmailVerificationForm';
import { useAuth } from '@/hooks/useAuth';

export default function EmailVerificationPage() {
  const {
    requestEmailVerification,
    emailVerificationStatus,
    verificationMessage,
    error,
    resetEmailVerificationStatus,
    clearAuthError
  } = useAuth();

  // Clear errors when component mounts
  useEffect(() => {
    clearAuthError();
    resetEmailVerificationStatus();

    return () => {
      clearAuthError();
      resetEmailVerificationStatus();
    };
  }, [clearAuthError, resetEmailVerificationStatus]);

  const handleEmailVerification = async (email: string) => {
    await requestEmailVerification(email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {emailVerificationStatus === 'success' && (
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-4">
            {verificationMessage || 'Verification email sent! Please check your inbox.'}
          </div>
        )}

        <EmailVerificationForm 
          onSubmit={handleEmailVerification} 
          isLoading={emailVerificationStatus === 'loading'}
        >
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link 
                href="/auth/sign-in" 
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Back to Sign In
              </Link>
            </div>
            
            <div className="text-center">
              <Link 
                href="/auth/sign-up" 
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Don't have an account? Sign up here
              </Link>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              If you don't receive an email within a few minutes, please check your spam folder or try again.
            </div>
          </div>
        </EmailVerificationForm>
      </div>
    </div>
  );
}