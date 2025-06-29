'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthFormData, AuthFieldConfig } from '@/types/auth';

const FORGOT_PASSWORD_FIELDS: AuthFieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email address',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }
  }
];

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleForgotPassword = async (data: AuthFormData) => {
    try {
      setError('');
      setMessage('');

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }

      setMessage('If the email exists in our system, you will receive password recovery instructions.');
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-4">
            {message}
          </div>
        )}

        <AuthForm
          mode="signin"
          fields={FORGOT_PASSWORD_FIELDS}
          onSubmit={handleForgotPassword}
          title="Forgot Password"
          subtitle="Enter your email address and we'll send you recovery instructions"
          submitText="Send Instructions"
          loadingText="Sending..."
        >
          <div className="mt-6 text-center space-y-2">
            <Link 
              href="/auth/sign-in" 
              className="text-blue-600 hover:text-blue-800 text-sm block"
            >
              Back to Sign In
            </Link>
            <Link 
              href="/auth/sign-up" 
              className="text-gray-600 hover:text-gray-800 text-sm block"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </AuthForm>
      </div>
    </div>
  );
}
