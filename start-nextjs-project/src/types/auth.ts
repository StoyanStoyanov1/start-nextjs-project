export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | object | null;
    googleAuthUrl: string | null;
    registrationStatus: 'idle' | 'loading' | 'success' | 'error';
    emailVerificationStatus: 'idle' | 'loading' | 'success' | 'error';
    verificationMessage: string | null;
    tokenVerificationStatus: 'idle' | 'loading' | 'success' | 'error';
    verificationToken: string | null;
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
  isLoading?: boolean;
  initialData?: AuthFormData;
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

export interface EmailVerificationRequest {
    email: string;
}

export interface EmailVerificationResponse {
    message: string;
}

export interface IEmailVerificationService {
    requestVerifyToken(email: string): Promise<string>;
}

export interface TokenVerificationRequest {
    token: string;
}

export interface TokenVerificationResponse {
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
}

export interface ITokenVerification {
    verifyToken(token: string): Promise<TokenVerificationResponse>;
}
