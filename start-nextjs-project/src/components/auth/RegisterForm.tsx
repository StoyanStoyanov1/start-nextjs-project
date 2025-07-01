'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import { validateRegistrationData } from '@/utils/validators';
import Link from 'next/link';

/**
 * Registration form component
 */
export const RegisterForm: React.FC = () => {
    const router = useRouter();
    const { register, registrationStatus, error, clearAuthError, resetRegStatus } = useAuth();

    // Form local state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Validation errors local state
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Clear state when component unmounts
    useEffect(() => {
        return () => {
            clearAuthError();
            resetRegStatus();
        };
    }, [clearAuthError, resetRegStatus]);

    // Handle form field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear field error if exists
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous errors
        clearAuthError();
        setValidationErrors({});

        // Validate data
        const validation = validateRegistrationData(formData);
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            return;
        }

        // Send registration request
        const result = await register({
            email: formData.email,
            password: formData.password,
            is_active: true,
            is_superuser: false,
            is_verified: false
        });

        // On success, redirect to login page or show success message
        if (result.meta.requestStatus === 'fulfilled') {
            setTimeout(() => {
                router.push('/login?registered=true');
            }, 2000);
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={registrationStatus === 'loading'}
                    />
                    {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                </div>

                {/* Password field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={registrationStatus === 'loading'}
                    />
                    {validationErrors.password && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                    )}
                </div>

                {/* Confirm password field */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={registrationStatus === 'loading'}
                    />
                    {validationErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                    )}
                </div>

                {/* Display API error */}
                {error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                        {typeof error === 'string' ? error : 'Registration failed'}
                    </div>
                )}

                {/* Display success message */}
                {registrationStatus === 'success' && (
                    <div className="text-green-500 text-sm p-2 bg-green-50 rounded">
                        Registration successful! Redirecting to login page...
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={registrationStatus === 'loading'}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                    {registrationStatus === 'loading' ? 'Creating account...' : 'Register'}
                </button>
            </form>

            {/* Link to login page */}
            <div className="mt-4 text-center text-sm">
                <span>Already have an account? </span>
                <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );
};
