import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '@/types/auth';
import {
    getGoogleAuthUrlAction,
    handleGoogleCallbackAction,
    getUserProfileAction,
    logoutAction,
    registerUserAction
} from '@/store/thunks/authThunks';

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    googleAuthUrl: null,
    registrationStatus: 'idle'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('authToken', action.payload);
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('authToken');
        },
        initializeAuth: (state) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            }
        },
        resetRegistrationStatus: (state) => {
            state.registrationStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        // Get Google Auth URL
        builder
            .addCase(getGoogleAuthUrlAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getGoogleAuthUrlAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.googleAuthUrl = action.payload.authorization_url;
            })
            .addCase(getGoogleAuthUrlAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Handle Google Callback
        builder
            .addCase(handleGoogleCallbackAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(handleGoogleCallbackAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(handleGoogleCallbackAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });

        // Get User Profile
        builder
            .addCase(getUserProfileAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfileAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getUserProfileAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Logout
        builder
            .addCase(logoutAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutAction.rejected, (state, action) => {
                state.isLoading = false;
                // Still clear auth data even if API call failed
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                // Store the error
                state.error = action.payload;
            });

                    // Register User
                    builder
            .addCase(registerUserAction.pending, (state) => {
                state.isLoading = true;
                state.registrationStatus = 'loading';
                state.error = null;
            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.registrationStatus = 'success';
                state.error = null;
                // We don't set the user automatically as there might be email verification requirements
                // or login after registration
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.registrationStatus = 'error';
                state.error = action.payload;
            });
    },
});

export const { clearError, setToken, clearAuth, initializeAuth, resetRegistrationStatus } = authSlice.actions;
export default authSlice.reducer;
