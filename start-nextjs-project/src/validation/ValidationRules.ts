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
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
      minLength: 'Email must be at least 5 characters',
      maxLength: 'Email cannot be more than 255 characters'
    }
  },
  
  // Password validation
  password: {
    minLength: 8,
    maxLength: 100,
    // At least one uppercase, one lowercase, one number, one special character
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    messages: {
      required: 'Password is required',
      minLength: 'Password must be at least 8 characters',
      maxLength: 'Password cannot be more than 100 characters',
      pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    }
  },
  
  // Name validation
  name: {
    minLength: 2,
    maxLength: 100,
    messages: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name cannot be more than 100 characters'
    }
  },
  
  // Token validation
  token: {
    minLength: 6,
    maxLength: 100,
    messages: {
      required: 'Token is required',
      minLength: 'Token must be at least 6 characters',
      maxLength: 'Token cannot be more than 100 characters',
      invalid: 'Invalid token'
    }
  },
  
  // Generic messages
  generic: {
    required: 'This field is required',
    invalid: 'Invalid value'
  }
} as const;

/**
 * Type for validation rules
 */
export type ValidationRulesType = typeof ValidationRules;