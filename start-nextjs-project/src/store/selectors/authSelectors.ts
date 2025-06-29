import { RootState } from '../store';

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectGoogleAuthUrl = (state: RootState) => state.auth.googleAuthUrl;

// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// src/store/index.ts (barrel export)
export { store } from './store';
export type { RootState, AppDispatch } from './store';

// Export actions
export {
    clearError,
    setToken,
    clearAuth,
    initializeAuth
} from './slices/authSlice';

// Export thunks
export {
    getGoogleAuthUrlAction,
    handleGoogleCallbackAction,
    getUserProfileAction,
    logoutAction
} from './thunks/authThunks';

// Export selectors
export * from './selectors/authSelectors';

// Export types
export type {
    User,
    AuthState,
    GoogleCallbackData,
    AuthResponse
} from '@/types/auth';