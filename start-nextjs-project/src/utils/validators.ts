/**
 * @param email email address to validate
 * @returns true if the email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password
 * @param password password to validate
 * @returns object with validation result and error message if any
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
    if (!password) {
        return { isValid: false, message: 'Password is required' };
    }

    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters' };
    }

    // You can add other validations if needed
    return { isValid: true };
};

/**
 * Interface for validation result
 */
export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

/**
 * Validates registration data
 * @param data registration data
 * @returns validation result
 */
export const validateRegistrationData = (data: {
    email: string;
    password: string;
    confirmPassword: string;
}): ValidationResult => {
    const errors: Record<string, string> = {};

    // Email validation
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!data.password) {
        errors.password = 'Password is required';
    } else {
        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.message || 'Invalid password';
        }
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
