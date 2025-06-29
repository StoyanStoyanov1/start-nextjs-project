'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { validateRegistrationData } from '@/utils/validators';
import Link from 'next/link';

/**
 * Компонент за форма за регистрация на потребители
 */
export const RegisterForm: React.FC = () => {
    const router = useRouter();
    const { register, registrationStatus, error, clearAuthError, resetRegStatus } = useAuth();

    // Локално състояние на формата
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Локално състояние за грешки при валидация
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Изчистване на състоянието при размонтиране на компонента
    useEffect(() => {
        return () => {
            clearAuthError();
            resetRegStatus();
        };
    }, [clearAuthError, resetRegStatus]);

    // Обработка на промените в полетата на формата
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Изчистване на грешка за полето, ако има такава
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Обработка на изпращането на формата
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Изчистване на предишни грешки
        clearAuthError();
        setValidationErrors({});

        // Валидиране на данните
        const validation = validateRegistrationData(formData);
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            return;
        }

        // Изпращане на заявка за регистрация
        const result = await register({
            email: formData.email,
            password: formData.password,
            is_active: true,
            is_superuser: false,
            is_verified: false
        });

        // При успех можем да пренасочим към страница за вход
        // или да покажем съобщение за успешна регистрация
        if (result.meta.requestStatus === 'fulfilled') {
            setTimeout(() => {
                router.push('/login?registered=true');
            }, 2000);
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Поле за имейл */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Имейл
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

                {/* Поле за парола */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Парола
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

                {/* Поле за потвърждение на паролата */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Потвърждаване на паролата
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

                {/* Показване на грешка от API */}
                {error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                        {typeof error === 'string' ? error : 'Регистрацията се провали'}
                    </div>
                )}

                {/* Показване на успешно съобщение */}
                {registrationStatus === 'success' && (
                    <div className="text-green-500 text-sm p-2 bg-green-50 rounded">
                        Регистрацията е успешна! Пренасочване към страницата за вход...
                    </div>
                )}

                {/* Бутон за изпращане */}
                <button
                    type="submit"
                    disabled={registrationStatus === 'loading'}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                    {registrationStatus === 'loading' ? 'Създаване на акаунт...' : 'Регистрация'}
                </button>
            </form>

            {/* Линк към страницата за вход */}
            <div className="mt-4 text-center text-sm">
                <span>Вече имате акаунт? </span>
                <Link href="/login" className="text-blue-500 hover:underline">
                    Вход
                </Link>
            </div>
        </div>
    );
};
