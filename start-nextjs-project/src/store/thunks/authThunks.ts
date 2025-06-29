import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import { Urls } from '@/constants/urls';
import type { GoogleCallbackData, AuthResponse, EmailVerificationRequest } from '@/types/auth';
import { RegisterRequest, RegisterResponse } from '@/types/register';
import { AuthService } from '@/services/authService';

export const getGoogleAuthUrlAction = createAsyncThunk(
    'auth/getGoogleAuthUrl',
    async (scopes: string[] = ['email'], { rejectWithValue }) => {
        try {
            const response = await api.get(Urls.auth.googleAuthorize, {
                params: { scopes }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data ||
                error.message ||
                'Failed to get Google auth URL'
            );
        }
    }
);

export const handleGoogleCallbackAction = createAsyncThunk<
    AuthResponse,
    GoogleCallbackData,
    { rejectValue: string }
>(
    'auth/handleGoogleCallback',
    async (callbackData, { rejectWithValue }) => {
        try {
            const response = await api.get(Urls.auth.googleCallback, {
                params: {
                    code: callbackData.code,
                    state: callbackData.state
                }
            });

            const { user, token } = response.data;

            // Store token in localStorage
            if (token) {
                localStorage.setItem('authToken', token);
            }

            return { user, token };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data ||
                error.message ||
                'Google authentication failed'
            );
        }
    }
);

export const getUserProfileAction = createAsyncThunk(
    'auth/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(Urls.auth.profile);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data ||
                error.message ||
                'Failed to get user profile'
            );
        }
    }
);

export const logoutAction = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post(Urls.auth.logout);
            localStorage.removeItem('authToken');
            return true;
        } catch (error: any) {
            // Even if API call fails, remove token locally
            localStorage.removeItem('authToken');
            return rejectWithValue(
                error.response?.data ||
                error.message ||
                'Logout failed'
            );
        }
    }
);

/**
 * Registers a new user in the system
 */
export const registerUserAction = createAsyncThunk<
    RegisterResponse,
    RegisterRequest,
    { rejectValue: string }
>(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(userData);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.message || 'Registration failed'
            );
        }
    }
);

/**
 * Requests a verification token to be sent to the user's email
 */
export const requestEmailVerificationAction = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    'auth/requestEmailVerification',
    async (email, { rejectWithValue }) => {
        try {
            const message = await AuthService.requestVerifyToken(email);
            return message;
        } catch (error: any) {
            return rejectWithValue(
                error.message || 'Failed to send verification email'
            );
        }
    }
);
