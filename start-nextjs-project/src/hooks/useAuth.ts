import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '@/store/store';
import {
    registerUserAction,
    getGoogleAuthUrlAction,
    handleGoogleCallbackAction,
    getUserProfileAction,
    logoutAction
} from '@/store/thunks/authThunks';
import { clearError, resetRegistrationStatus } from '@/store/slices/authSlice';
import type { RegisterRequest } from '@/types/register';
import type { GoogleCallbackData } from '@/types/auth';

/**
 * Custom hook за управление на автентикацията
 */
export const useAuth = () => {
    const dispatch = useDispatch<any>();
    const authState = useSelector((state: RootState) => state.auth);

    // Регистрация на потребител
    const register = useCallback(
        async (userData: RegisterRequest) => {
            return await dispatch(registerUserAction(userData));
        },
        [dispatch]
    );

    // Логин с Google
    const getGoogleAuthUrl = useCallback(
        async (scopes: string[] = ['email']) => {
            return await dispatch(getGoogleAuthUrlAction(scopes));
        },
        [dispatch]
    );

    // Обработка на callback от Google
    const handleGoogleCallback = useCallback(
        async (callbackData: GoogleCallbackData) => {
            return await dispatch(handleGoogleCallbackAction(callbackData));
        },
        [dispatch]
    );

    // Получаване на профил на потребител
    const getUserProfile = useCallback(
        async () => {
            return await dispatch(getUserProfileAction());
        },
        [dispatch]
    );

    // Изход от системата
    const logout = useCallback(
        async () => {
            return await dispatch(logoutAction());
        },
        [dispatch]
    );

    // Изчистване на грешки
    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Нулиране на статуса на регистрацията
    const resetRegStatus = useCallback(() => {
        dispatch(resetRegistrationStatus());
    }, [dispatch]);

    return {
        ...authState,
        register,
        getGoogleAuthUrl,
        handleGoogleCallback,
        getUserProfile,
        logout,
        clearAuthError,
        resetRegStatus
    };
};
