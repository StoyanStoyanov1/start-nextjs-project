import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  requestEmailVerificationAction
} from '@/store/thunks/authThunks';
import { 
  resetEmailVerificationStatus
} from '@/store/slices/authSlice';
import { useAuthState } from './useAuthState';

/**
 * Hook for email verification functionality
 * Focused on email verification flow
 */
export const useEmailVerification = () => {
  const dispatch = useDispatch<any>();
  const { 
    emailVerificationStatus, 
    verificationMessage 
  } = useAuthState();

  // Request email verification
  const requestEmailVerification = useCallback(
    async (email: string) => {
      return await dispatch(requestEmailVerificationAction(email));
    },
    [dispatch]
  );

  // Reset email verification status
  const resetEmailVerificationStatusValue = useCallback(() => {
    dispatch(resetEmailVerificationStatus());
  }, [dispatch]);

  return {
    // State
    emailVerificationStatus,
    verificationMessage,
    
    // Actions
    requestEmailVerification,
    resetEmailVerificationStatus: resetEmailVerificationStatusValue
  };
};