import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import { Urls } from '@/constants/urls';
import type { GoogleCallbackData, AuthResponse } from '@/types/auth';

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
            const response = await api.post(Urls.auth.googleCallback, null, {
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