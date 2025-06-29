import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
import { AuthFormData } from '@/types/auth';
import { TOKEN_VERIFICATION_FIELDS } from '@/constants/authFields';

interface TokenVerificationFormProps {
  onSubmit: (token: string) => Promise<void>;
  isLoading?: boolean;
  initialToken?: string;
  className?: string;
  children?: React.ReactNode;
}

export const TokenVerificationForm: React.FC<TokenVerificationFormProps> = ({
  onSubmit,
  isLoading,
  initialToken = '',
  className,
  children
}) => {
  const [error, setError] = useState('');

  // Create initial form data with the token if provided
  const initialFormData = initialToken ? { token: initialToken } : undefined;

  const handleSubmit = async (data: AuthFormData) => {
    try {
      setError('');
      await onSubmit(data.token);
    } catch (error: any) {
      setError(error.message || 'Token verification failed');
    }
  };

  // Use the token field configuration from constants

  return (
    <AuthForm
      mode="signin" // Reuse signin mode for styling
      fields={TOKEN_VERIFICATION_FIELDS}
      onSubmit={handleSubmit}
      title="Verify Your Email"
      subtitle="Enter the verification token from your email"
      submitText="Verify Email"
      loadingText="Verifying..."
      className={className}
      isLoading={isLoading}
      initialData={initialFormData}
    >
      {error && (
        <div className="mt-4 text-red-600 text-sm">{error}</div>
      )}
      {children}
    </AuthForm>
  );
};
