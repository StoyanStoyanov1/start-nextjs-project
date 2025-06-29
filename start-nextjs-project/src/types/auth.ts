export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | object | null;
    googleAuthUrl: string | null;
    registrationStatus: 'idle' | 'loading' | 'success' | 'error';
}
export interface AuthFieldConfig {
  name: string;
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

export interface AuthFormData {
  [key: string]: string;
}

export interface AuthFormProps {
  mode: 'signin' | 'signup';
  fields: AuthFieldConfig[];
  onSubmit: (data: AuthFormData) => Promise<void> | void;
  submitText?: string;
  loadingText?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface AuthFormValidationErrors {
  [key: string]: string;
}
export interface GoogleCallbackData {
    code: string;
    state: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
