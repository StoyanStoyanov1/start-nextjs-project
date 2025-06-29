import React from 'react';
import { AuthFieldConfig } from '@/types/auth';

interface AuthFieldProps {
  field: AuthFieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const AuthField: React.FC<AuthFieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
        aria-describedby={error ? `${field.name}-error` : undefined}
        aria-invalid={!!error}
      />

      {error && (
        <p
          id={`${field.name}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
