export interface RegisterRequest {
    email: string;
    password: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_verified?: boolean;
}

export interface RegisterResponse {
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
}

export interface RegisterError {
    detail: string | ValidationError[];
}

export interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}
