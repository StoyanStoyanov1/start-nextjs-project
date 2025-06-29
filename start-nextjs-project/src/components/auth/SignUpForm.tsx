import React from 'react';
import { AuthForm } from './AuthForm';
import { SIGNUP_FIELDS } from '@/constants/authFields';
import { AuthFormData } from '@/types/auth';

interface SignUpFormProps {
  onSubmit: (data: AuthFormData) => Promise<void>;
  className?: string;
  children?: React.ReactNode;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  className,
  children
}) => {
  const handleSubmit = async (data: AuthFormData) => {
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    await onSubmit(data);
  };

  return (
    <AuthForm
      mode="signup"
      fields={SIGNUP_FIELDS}
      onSubmit={handleSubmit}
      title="Sign Up"
      subtitle="Create your account"
      className={className}
    >
      {children}
    </AuthForm>
  );
};
