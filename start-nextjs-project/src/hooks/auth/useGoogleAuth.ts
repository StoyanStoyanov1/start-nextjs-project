import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  getGoogleAuthUrlAction,
  handleGoogleCallbackAction
} from '@/store/thunks/authThunks';
import { useAuthState } from './useAuthState';
import type { GoogleCallbackData } from '@/types/auth';

/**
 * Hook for Google OAuth functionality
 * Focused on Google OAuth flow
 */
export const useGoogleAuth = () => {
  const dispatch = useDispatch<any>();
  const { googleAuthUrl } = useAuthState();

  // Get Google auth URL
  const getGoogleAuthUrl = useCallback(
    async (scopes: string[] = ['email']) => {
      return await dispatch(getGoogleAuthUrlAction(scopes));
    },
    [dispatch]
  );

  // Handle Google callback
  const handleGoogleCallback = useCallback(
    async (callbackData: GoogleCallbackData) => {
      return await dispatch(handleGoogleCallbackAction(callbackData));
    },
    [dispatch]
  );

  return {
    // State
    googleAuthUrl,
    
    // Actions
    getGoogleAuthUrl,
    handleGoogleCallback
  };
};