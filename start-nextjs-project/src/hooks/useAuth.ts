import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '@/store/store';
import {
    registerUserAction,
    getGoogleAuthUrlAction,
    handleGoogleCallbackAction,
    getUserProfileAction,
    logoutAction,
    requestEmailVerificationAction
} from '@/store/thunks/authThunks';
import { clearError, resetRegistrationStatus, resetEmailVerificationStatus } from '@/store/slices/authSlice';
import type { RegisterRequest } from '@/types/register';
import type { GoogleCallbackData } from '@/types/auth';

/**
 * Custom hook for authentication management
 */
export const useAuth = () => {
    const dispatch = useDispatch<any>();
    const authState = useSelector((state: RootState) => state.auth);

    // User registration
    const register = useCallback(
        async (userData: RegisterRequest) => {
            return await dispatch(registerUserAction(userData));
        },
        [dispatch]
    );

    // Google login
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

    // Request email verification
    const requestEmailVerification = useCallback(
        async (email: string) => {
            return await dispatch(requestEmailVerificationAction(email));
        },
        [dispatch]
    );

    // Reset email verification status
    const resetEmailVerificationStatus = useCallback(() => {
        dispatch(resetEmailVerificationStatus());
    }, [dispatch]);

    return {
        ...authState,
        register,
        getGoogleAuthUrl,
        handleGoogleCallback,
        getUserProfile,
        logout,
        clearAuthError,
        resetRegStatus,
        requestEmailVerification,
        resetEmailVerificationStatus
    };
};
