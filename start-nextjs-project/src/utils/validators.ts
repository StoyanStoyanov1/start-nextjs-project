/**
 * @param email имейл адрес за валидация
 * @returns true ако имейлът е валиден, false в противен случай
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Валидира парола
 * @param password парола за валидация
 * @returns обект с резултат от валидацията и съобщение за грешка, ако има такава
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
    if (!password) {
        return { isValid: false, message: 'Паролата е задължителна' };
    }

    if (password.length < 8) {
        return { isValid: false, message: 'Паролата трябва да бъде поне 8 символа' };
    }

    // Може да добавите и други валидации при нужда
    return { isValid: true };
};

/**
 * Интерфейс за резултат от валидация
 */
export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

/**
 * Валидира данни за регистрация
 * @param data данни за регистрация
 * @returns резултат от валидацията
 */
export const validateRegistrationData = (data: {
    email: string;
    password: string;
    confirmPassword: string;
}): ValidationResult => {
    const errors: Record<string, string> = {};

    // Валидация на имейл
    if (!data.email) {
        errors.email = 'Имейлът е задължителен';
    } else if (!validateEmail(data.email)) {
        errors.email = 'Моля, въведете валиден имейл адрес';
    }

    // Валидация на парола
    if (!data.password) {
        errors.password = 'Паролата е задължителна';
    } else {
        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.message || 'Невалидна парола';
        }
    }

    // Валидация на потвърждение на паролата
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Паролите не съвпадат';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
