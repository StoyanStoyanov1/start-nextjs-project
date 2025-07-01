import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { useEmailVerification } from './useEmailVerification';
import { useTokenVerification } from './useTokenVerification';
import { useGoogleAuth } from './useGoogleAuth';

/**
 * Main auth hook that composes all the smaller hooks
 * Provides a unified API for authentication functionality
 */
export const useAuth = () => {
  const authState = useAuthState();
  const authActions = useAuthActions();
  const emailVerification = useEmailVerification();
  const tokenVerification = useTokenVerification();
  const googleAuth = useGoogleAuth();

  return {
    // From useAuthState
    ...authState,
    
    // From useAuthActions
    ...authActions,
    
    // From useEmailVerification
    ...emailVerification,
    
    // From useTokenVerification
    ...tokenVerification,
    
    // From useGoogleAuth
    ...googleAuth
  };
};

// Export individual hooks for more granular usage
export { 
  useAuthState,
  useAuthActions,
  useEmailVerification,
  useTokenVerification,
  useGoogleAuth
};