'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { handleGoogleCallbackAction, clearError } from '@/store/slices/authSlice';

export default function AuthSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

    useEffect(() => {
        const processCallback = async () => {
            const code = searchParams.get('code');
            const state = searchParams.get('state');

            if (!code || !state) {
                setStatus('error');
                return;
            }

            try {
                await dispatch(handleGoogleCallbackAction({ code, state })).unwrap();
                setStatus('success');

                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);

            } catch (error) {
                console.error('Callback error:', error);
                setStatus('error');
            }
        };

        // Clear any previous errors
        dispatch(clearError());
        processCallback();
    }, [searchParams, dispatch, router]);

    if (status === 'processing' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Processing login...</h2>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (status === 'error' || error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Login Failed</h2>
                    <p className="text-gray-600 mb-4">Something went wrong during authentication.</p>
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Login Successful!</h2>
                <p className="text-gray-600">Redirecting to dashboard...</p>
            </div>
        </div>
    );
}