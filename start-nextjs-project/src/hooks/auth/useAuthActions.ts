import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  registerUserAction,
  getUserProfileAction,
  logoutAction
} from '@/store/thunks/authThunks';
import { 
  clearError, 
  resetRegistrationStatus
} from '@/store/slices/authSlice';
import type { RegisterRequest } from '@/types/register';
import { authRepository } from '@/repositories/AuthRepository';

/**
 * Hook for authentication actions
 * Focused on actions (login, logout, register)
 */
export const useAuthActions = () => {
  const dispatch = useDispatch<any>();

  // User registration
  const register = useCallback(
    async (userData: RegisterRequest) => {
      return await dispatch(registerUserAction(userData));
    },
    [dispatch]
  );

  // Login (using repository directly for now)
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authRepository.login(email, password);
        // After successful login, get the user profile
        await dispatch(getUserProfileAction());
        return response;
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  // Get user profile
  const getUserProfile = useCallback(
    async () => {
      return await dispatch(getUserProfileAction());
    },
    [dispatch]
  );

  // Logout
  const logout = useCallback(
    async () => {
      return await dispatch(logoutAction());
    },
    [dispatch]
  );

  // Clear errors
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Reset registration status
  const resetRegStatus = useCallback(() => {
    dispatch(resetRegistrationStatus());
  }, [dispatch]);

  return {
    register,
    login,
    getUserProfile,
    logout,
    clearAuthError,
    resetRegStatus
  };
};