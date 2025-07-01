/**
 * Interface for validation strategies
 * Implements Strategy pattern for form validation
 */
export interface IValidationStrategy {
  /**
   * Validates a value according to the strategy
   * @param value - The value to validate
   * @param options - Optional validation options
   * @returns null if valid, error message if invalid
   */
  validate(value: string, options?: Record<string, any>): string | null;

  /**
   * Gets the name of the strategy
   * @returns The strategy name
   */
  getName(): string;
}

/**
 * Interface for field validator
 * Uses validation strategies to validate form fields
 */
export interface IFieldValidator {
  /**
   * Validates a field value using the appropriate strategy
   * @param fieldName - The name of the field
   * @param value - The value to validate
   * @param options - Optional validation options
   * @returns null if valid, error message if invalid
   */
  validateField(fieldName: string, value: string, options?: Record<string, any>): string | null;

  /**
   * Adds a validation strategy for a field
   * @param fieldName - The name of the field
   * @param strategy - The validation strategy to use
   * @param options - Optional validation options
   */
  addStrategy(fieldName: string, strategy: IValidationStrategy, options?: Record<string, any>): void;

  /**
   * Removes a validation strategy for a field
   * @param fieldName - The name of the field
   * @param strategyName - The name of the strategy to remove
   */
  removeStrategy(fieldName: string, strategyName: string): void;

  /**
   * Validates all fields in a form
   * @param formData - The form data to validate
   * @returns Object with field names as keys and error messages as values
   */
  validateForm(formData: Record<string, string>): Record<string, string>;
}