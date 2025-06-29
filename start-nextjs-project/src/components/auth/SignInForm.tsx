import React from 'react';
import { AuthForm } from './AuthForm';
import { SIGNIN_FIELDS } from '@/constants/authFields';
import { AuthFormData } from '@/types/auth';

interface SignInFormProps {
  onSubmit: (data: AuthFormData) => Promise<void>;
  className?: string;
  children?: React.ReactNode;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  className,
  children
}) => {
  return (
    <AuthForm
      mode="signin"
      fields={SIGNIN_FIELDS}
      onSubmit={onSubmit}
      title="Sign In"
      subtitle="Enter your credentials"
      className={className}
    >
      {children}
    </AuthForm>
  );
};
