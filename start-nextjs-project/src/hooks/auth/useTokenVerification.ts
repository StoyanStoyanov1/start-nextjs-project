import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  verifyTokenAction
} from '@/store/thunks/authThunks';
import { 
  resetTokenVerificationStatus,
  setVerificationToken
} from '@/store/slices/authSlice';
import { useAuthState } from './useAuthState';

/**
 * Hook for token verification functionality
 * Focused on token verification flow
 */
export const useTokenVerification = () => {
  const dispatch = useDispatch<any>();
  const { 
    tokenVerificationStatus, 
    verificationToken 
  } = useAuthState();

  // Verify token
  const verifyToken = useCallback(
    async (token: string) => {
      return await dispatch(verifyTokenAction(token));
    },
    [dispatch]
  );

  // Set verification token
  const setVerificationTokenValue = useCallback((token: string) => {
    dispatch(setVerificationToken(token));
  }, [dispatch]);

  // Reset token verification status
  const resetTokenVerificationStatusValue = useCallback(() => {
    dispatch(resetTokenVerificationStatus());
  }, [dispatch]);

  return {
    // State
    tokenVerificationStatus,
    verificationToken,
    
    // Actions
    verifyToken,
    setVerificationToken: setVerificationTokenValue,
    resetTokenVerificationStatus: resetTokenVerificationStatusValue
  };
};