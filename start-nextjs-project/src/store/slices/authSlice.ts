import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '@/types/auth';
import {
    getGoogleAuthUrlAction,
    handleGoogleCallbackAction,
    getUserProfileAction,
    logoutAction,
    registerUserAction,
    requestEmailVerificationAction,
    verifyTokenAction
} from '@/store/thunks/authThunks';
import { initializeAuthFromStorage } from '@/store/middleware/localStorageMiddleware';

// Инициализираме state от localStorage (само при client-side)
const storageData = initializeAuthFromStorage();

const initialState: AuthState = {
    user: null,
    token: storageData.token,
    isLoading: false,
    isAuthenticated: storageData.isAuthenticated,
    error: null,
    googleAuthUrl: null,
    registrationStatus: 'idle',
    emailVerificationStatus: 'idle',
    verificationMessage: null,
    tokenVerificationStatus: 'idle',
    verificationToken: null
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
            // localStorage операцията се случва в middleware
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            // localStorage операцията се случва в middleware
        },
        initializeAuth: (state) => {
            // Вече не четем директно от localStorage тук
            // Инициализацията се случва при създаване на initialState
            const storageData = initializeAuthFromStorage();
            if (storageData.token) {
                state.token = storageData.token;
                state.isAuthenticated = storageData.isAuthenticated;
            }
        },
        resetRegistrationStatus: (state) => {
            state.registrationStatus = 'idle';
        },
        resetEmailVerificationStatus: (state) => {
            state.emailVerificationStatus = 'idle';
            state.verificationMessage = null;
        },
        resetTokenVerificationStatus: (state) => {
            state.tokenVerificationStatus = 'idle';
            state.verificationToken = null;
        },
        setVerificationToken: (state, action: PayloadAction<string>) => {
            state.verificationToken = action.payload;
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
                state.error = action.payload || 'An error occurred';
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
                // localStorage операцията се случва в middleware
            })
            .addCase(handleGoogleCallbackAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Google authentication failed';
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
                state.error = action.payload || 'Failed to get user profile';
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
                // localStorage операцията се случва в middleware
            })
            .addCase(logoutAction.rejected, (state, action) => {
                state.isLoading = false;
                // Still clear auth data even if API call failed
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                // Store the error
                state.error = action.payload || 'Logout failed';
                // localStorage операцията се случва в middleware
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
                state.error = action.payload || 'Registration failed';
            });

        // Request Email Verification
        builder
            .addCase(requestEmailVerificationAction.pending, (state) => {
                state.isLoading = true;
                state.emailVerificationStatus = 'loading';
                state.error = null;
                state.verificationMessage = null;
            })
            .addCase(requestEmailVerificationAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.emailVerificationStatus = 'success';
                state.verificationMessage = action.payload;
                state.error = null;
            })
            .addCase(requestEmailVerificationAction.rejected, (state, action) => {
                state.isLoading = false;
                state.emailVerificationStatus = 'error';
                state.error = action.payload || 'Email verification failed';
            });

        // Verify Token
        builder
            .addCase(verifyTokenAction.pending, (state) => {
                state.isLoading = true;
                state.tokenVerificationStatus = 'loading';
                state.error = null;
            })
            .addCase(verifyTokenAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tokenVerificationStatus = 'success';
                state.user = {
                    ...state.user,
                    ...action.payload,
                    name: state.user?.name // Preserve name if it exists
                };
                state.error = null;
            })
            .addCase(verifyTokenAction.rejected, (state, action) => {
                state.isLoading = false;
                state.tokenVerificationStatus = 'error';
                state.error = action.payload || 'Token verification failed';
            });
    },
});

export const { 
    clearError, 
    setToken, 
    clearAuth, 
    initializeAuth, 
    resetRegistrationStatus, 
    resetEmailVerificationStatus,
    resetTokenVerificationStatus,
    setVerificationToken
} = authSlice.actions;
export default authSlice.reducer;
