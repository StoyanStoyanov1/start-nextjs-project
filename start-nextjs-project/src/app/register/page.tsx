import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Регистрация',
    description: 'Създайте акаунт, за да използвате нашата платформа',
};

/**
 * Страница за регистрация на потребители
 */
export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <RegisterForm />
        </div>
    );
}
