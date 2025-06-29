import { useState, useCallback } from 'react';
import { AuthFormData, AuthFieldConfig, AuthFormValidationErrors } from '@/types/auth';

export const useAuthForm = (fields: AuthFieldConfig[]) => {
  const [formData, setFormData] = useState<AuthFormData>(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState<AuthFormValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = useCallback((field: AuthFieldConfig, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} е задължително поле`;
    }

    if (field.validation) {
      const { minLength, maxLength, pattern, custom } = field.validation;

      if (minLength && value.length < minLength) {
        return `${field.label} трябва да бъде поне ${minLength} символа`;
      }

      if (maxLength && value.length > maxLength) {
        return `${field.label} не може да бъде повече от ${maxLength} символа`;
      }

      if (pattern && !pattern.test(value)) {
        return `${field.label} има невалиден формат`;
      }

      if (custom) {
        const customError = custom(value);
        if (customError) return customError;
      }
    }

    return null;
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: AuthFormValidationErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [fields, formData, validateField]);

  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (
    onSubmit: (data: AuthFormData) => Promise<void> | void
  ) => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    setErrors({});
    setIsLoading(false);
  }, [fields]);

  return {
    formData,
    errors,
    isLoading,
    handleFieldChange,
    handleSubmit,
    resetForm,
    setIsLoading
  };
};
