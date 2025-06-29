'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { TokenVerificationForm } from '@/components/auth/TokenVerificationForm';
import Link from 'next/link';

export default function TokenVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    verifyToken,
    tokenVerificationStatus,
    error,
    user,
    clearAuthError,
    resetTokenVerificationStatus
  } = useAuth();

  const [initialToken, setInitialToken] = useState('');

  // Extract token from URL params or email link
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setInitialToken(tokenFromUrl);
    }
  }, [searchParams]);

  // Clear state on mount
  useEffect(() => {
    clearAuthError();
    resetTokenVerificationStatus();

    return () => {
      clearAuthError();
      resetTokenVerificationStatus();
    };
  }, [clearAuthError, resetTokenVerificationStatus]);

  // Auto-verify if token is in URL
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl && tokenFromUrl.length > 0 && tokenVerificationStatus === 'idle') {
      handleTokenSubmit(tokenFromUrl);
    }
  }, [searchParams, tokenVerificationStatus]);

  // Handle successful verification
  useEffect(() => {
    if (tokenVerificationStatus === 'success' && user?.is_verified) {
      setTimeout(() => {
        router.push('/auth/sign-in?verified=true');
      }, 3000);
    }
  }, [tokenVerificationStatus, user, router]);

  const handleTokenSubmit = async (token: string) => {
    try {
      const result = await verifyToken(token);
      if (result.meta.requestStatus === 'fulfilled') {
        // Success handling is done in useEffect above
      }
    } catch (error) {
      console.error('Token verification error:', error);
    }
  };

  if (tokenVerificationStatus === 'success' && user?.is_verified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-4">
            <h2 className="text-xl font-bold mb-2">Email Verified Successfully!</h2>
            <p>Your email address has been verified. Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full space-y-6">
        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md">
            {typeof error === 'object' 
              ? (error.detail || JSON.stringify(error))
              : error
            }
          </div>
        )}

        {/* Token Verification Form */}
        <TokenVerificationForm
          onSubmit={handleTokenSubmit}
          isLoading={tokenVerificationStatus === 'loading'}
          initialToken={initialToken}
        >
          {/* Additional Links */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link 
                href="/auth/verify-email" 
                className="text-blue-600 hover:text-blue-800 text-sm block"
              >
                Didn't receive the email? Request new verification token
              </Link>
            </div>
            <div className="text-center">
              <Link 
                href="/auth/sign-in" 
                className="text-gray-600 hover:text-gray-800 text-sm block"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </TokenVerificationForm>
      </div>
    </div>
  );
}