import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

/**
 * Hook for accessing authentication state
 * Focused on state management (user, isAuthenticated, isLoading)
 */
export const useAuthState = () => {
  const {
    user,
    token,
    isLoading,
    isAuthenticated,
    error,
    googleAuthUrl,
    registrationStatus,
    emailVerificationStatus,
    verificationMessage,
    tokenVerificationStatus,
    verificationToken
  } = useSelector((state: RootState) => state.auth);

  return {
    // User state
    user,
    token,
    isAuthenticated,
    
    // Loading state
    isLoading,
    
    // Error state
    error,
    
    // Google auth state
    googleAuthUrl,
    
    // Registration state
    registrationStatus,
    
    // Email verification state
    emailVerificationStatus,
    verificationMessage,
    
    // Token verification state
    tokenVerificationStatus,
    verificationToken
  };
};