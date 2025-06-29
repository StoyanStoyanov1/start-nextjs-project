export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | object | null;
    googleAuthUrl: string | null;
}

export interface GoogleCallbackData {
    code: string;
    state: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
