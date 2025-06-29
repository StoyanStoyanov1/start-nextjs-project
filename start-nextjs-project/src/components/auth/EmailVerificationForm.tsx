import React from 'react';
import { AuthForm } from './AuthForm';
import { EMAIL_VERIFICATION_FIELDS } from '@/constants/authFields';
import { AuthFormData } from '@/types/auth';

interface EmailVerificationFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const EmailVerificationForm: React.FC<EmailVerificationFormProps> = ({
  onSubmit,
  className,
  children,
  isLoading
}) => {
  const handleSubmit = async (data: AuthFormData) => {
    await onSubmit(data.email);
  };

  return (
    <AuthForm
      mode="signin" // Reuse signin mode for styling
      fields={EMAIL_VERIFICATION_FIELDS}
      onSubmit={handleSubmit}
      title="Verify Your Email"
      subtitle="Enter your email address to receive a verification link"
      submitText="Send Verification Email"
      loadingText="Sending..."
      className={className}
      isLoading={isLoading}
    >
      {children}
    </AuthForm>
  );
};