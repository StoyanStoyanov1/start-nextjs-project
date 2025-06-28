'use client'

import { api } from '@/store/api'

export function GoogleLoginButton() {
    const [getGoogleUrl, { isLoading }] = api.useLazyGetGoogleAuthUrlQuery()

    const handleGoogleLogin = async () => {
        try {
            const result = await getGoogleUrl(['email']).unwrap()
            if (result.authorization_url) {
                window.location.href = result.authorization_url
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
            {isLoading ? 'Loading...' : 'Sign in with Google'}
        </button>
    )
}