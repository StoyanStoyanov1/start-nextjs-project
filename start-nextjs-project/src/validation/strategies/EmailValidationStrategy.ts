import { IValidationStrategy } from '@/types/interfaces/IValidationStrategy';
import { ValidationRules } from '../ValidationRules';

/**
 * Email validation strategy
 * Implements the Strategy pattern for email validation
 */
export class EmailValidationStrategy implements IValidationStrategy {
  /**
   * Gets the name of the strategy
   * @returns The strategy name
   */
  getName(): string {
    return 'email';
  }

  /**
   * Validates an email address
   * @param value - The email to validate
   * @param options - Optional validation options
   * @returns null if valid, error message if invalid
   */
  validate(value: string, options?: Record<string, any>): string | null {
    const rules = ValidationRules.email;
    const { required = true } = options || {};

    // Check if required
    if (required && !value.trim()) {
      return rules.messages.required;
    }

    // Skip further validation if empty and not required
    if (!value.trim()) {
      return null;
    }

    // Check min length
    if (value.length < rules.minLength) {
      return rules.messages.minLength;
    }

    // Check max length
    if (value.length > rules.maxLength) {
      return rules.messages.maxLength;
    }

    // Check pattern
    if (!rules.pattern.test(value)) {
      return rules.messages.invalid;
    }

    return null;
  }
}