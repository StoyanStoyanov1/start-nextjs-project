'use client'

import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const {
        user,
        isAuthenticated,
        isLoading,
        logout,
        getUserProfile
    } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isAuthenticated && !user) {
            getUserProfile();
        }
    }, [isAuthenticated, user, getUserProfile]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            router.push('/login');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 mb-4">
                            Welcome back, {user?.name || user?.email}!
                        </p>
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                        >
                            {isLoading ? 'Signing out...' : 'Sign Out'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}