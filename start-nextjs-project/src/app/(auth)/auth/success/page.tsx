'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useLazyGoogleCallbackQuery } from '@/store/api'

export default function AuthSuccessPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [googleCallback, { isLoading }] = useLazyGoogleCallbackQuery()
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
    const [errorDetails, setErrorDetails] = useState<string>('')

    useEffect(() => {
        const processCallback = async () => {
            const code = searchParams.get('code')
            const state = searchParams.get('state')

            console.log('Callback params:', { code, state }) // Debug

            if (!code || !state) {
                setStatus('error')
                setErrorDetails('Missing code or state parameters')
                return
            }

            try {
                const result = await googleCallback({ code, state }).unwrap()

                console.log('Backend response:', result)

                setStatus('success')

                setTimeout(() => {
                    router.push('/dashboard')
                }, 2000)

            } catch (error: any) {
                console.error('Full callback error:', error)
                setStatus('error')

                // По-детайлно error handling
                if (error.status === 'PARSING_ERROR') {
                    setErrorDetails(`Backend returned: ${error.data}`)
                } else if (error.originalStatus) {
                    setErrorDetails(`Backend error ${error.originalStatus}: ${error.data || 'Unknown error'}`)
                } else {
                    setErrorDetails(JSON.stringify(error))
                }
            }
        }

        processCallback()
    }, [searchParams, googleCallback, router])

    if (status === 'processing' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Processing login...</h2>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Login Failed</h2>
                    <p className="text-gray-600 mb-4">Something went wrong during authentication.</p>
                    <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                        <p className="text-sm text-red-800">{errorDetails}</p>
                    </div>
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Login Successful!</h2>
                <p className="text-gray-600">Redirecting to dashboard...</p>
            </div>
        </div>
    )
}