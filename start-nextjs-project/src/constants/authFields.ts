import { AuthFieldConfig } from '@/types/auth';

export const SIGNIN_FIELDS: AuthFieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
    validation: {
      minLength: 6,
    }
  }
];

export const SIGNUP_FIELDS: AuthFieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Create a password',
    required: true,
    validation: {
      minLength: 8,
      custom: (value: string) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
        }
        return null;
      }
    }
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    required: true,
    validation: {
      custom: (value: string, formData?: any) => {
        return null;
      }
    }
  }
];
