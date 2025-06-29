import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
    getGoogleAuthUrlAction,
    handleGoogleCallbackAction,
    getUserProfileAction,
    logoutAction,
    clearError,
    selectAuth,
    selectUser,
    selectIsAuthenticated,
    selectIsLoading,
    selectAuthError
} from '@/store';

export const useAuth = () => {
    const dispatch = useAppDispatch();

    // Selectors
    const auth = useAppSelector(selectAuth);
    const user = useAppSelector(selectUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectAuthError);

    // Actions
    const getGoogleAuthUrl = useCallback(
        (scopes: string[] = ['email']) => {
            return dispatch(getGoogleAuthUrlAction(scopes));
        },
        [dispatch]
    );

    const handleGoogleCallback = useCallback(
        (callbackData: { code: string; state: string }) => {
            return dispatch(handleGoogleCallbackAction(callbackData));
        },
        [dispatch]
    );

    const getUserProfile = useCallback(() => {
        return dispatch(getUserProfileAction());
    }, [dispatch]);

    const logout = useCallback(() => {
        return dispatch(logoutAction());
    }, [dispatch]);

    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        // State
        auth,
        user,
        isAuthenticated,
        isLoading,
        error,

        // Actions
        getGoogleAuthUrl,
        handleGoogleCallback,
        getUserProfile,
        logout,
        clearAuthError,
    };
};