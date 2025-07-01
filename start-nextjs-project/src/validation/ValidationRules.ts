/**
 * Centralized validation rules and messages
 */
export const ValidationRules = {
  // Email validation
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    minLength: 5,
    maxLength: 255,
    messages: {
      required: 'Email е задължително поле',
      invalid: 'Моля, въведете валиден email адрес',
      minLength: 'Email адресът трябва да бъде поне 5 символа',
      maxLength: 'Email адресът не може да бъде повече от 255 символа'
    }
  },
  
  // Password validation
  password: {
    minLength: 8,
    maxLength: 100,
    // At least one uppercase, one lowercase, one number, one special character
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    messages: {
      required: 'Паролата е задължително поле',
      minLength: 'Паролата трябва да бъде поне 8 символа',
      maxLength: 'Паролата не може да бъде повече от 100 символа',
      pattern: 'Паролата трябва да съдържа поне една главна буква, една малка буква, една цифра и един специален символ'
    }
  },
  
  // Name validation
  name: {
    minLength: 2,
    maxLength: 100,
    messages: {
      required: 'Името е задължително поле',
      minLength: 'Името трябва да бъде поне 2 символа',
      maxLength: 'Името не може да бъде повече от 100 символа'
    }
  },
  
  // Token validation
  token: {
    minLength: 6,
    maxLength: 100,
    messages: {
      required: 'Токенът е задължително поле',
      minLength: 'Токенът трябва да бъде поне 6 символа',
      maxLength: 'Токенът не може да бъде повече от 100 символа',
      invalid: 'Невалиден токен'
    }
  },
  
  // Generic messages
  generic: {
    required: 'Това поле е задължително',
    invalid: 'Невалидна стойност'
  }
} as const;

/**
 * Type for validation rules
 */
export type ValidationRulesType = typeof ValidationRules;