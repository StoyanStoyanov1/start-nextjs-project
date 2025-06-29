import React from 'react';
import { AuthFormProps } from '@/types/auth';
import { useAuthForm } from '@/hooks/useAuthForm';
import { AuthField } from './AuthField';

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  fields,
  onSubmit,
  submitText,
  loadingText = 'Loading...',
  title,
  subtitle,
  children,
  className = ''
}) => {
  const {
    formData,
    errors,
    isLoading,
    handleFieldChange,
    handleSubmit
  } = useAuthForm(fields);

  const defaultSubmitText = mode === 'signin' ? 'Sign In' : 'Sign Up';

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onSubmit);
  };

  return (
    <div className={`max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-gray-600 text-center mb-6">
          {subtitle}
        </p>
      )}

      <form onSubmit={onFormSubmit} noValidate>
        {fields.map((field) => (
          <AuthField
            key={field.name}
            field={field}
            value={formData[field.name]}
            error={errors[field.name]}
            onChange={(value) => handleFieldChange(field.name, value)}
            disabled={isLoading}
          />
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full py-2 px-4 rounded-md font-medium text-white transition-colors duration-200
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }
          `}
        >
          {isLoading ? loadingText : (submitText || defaultSubmitText)}
        </button>

        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </form>
    </div>
  );
};
