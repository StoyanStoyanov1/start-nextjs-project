'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return // Still loading
        if (!session) router.push('/login')
    }, [session, status, router])

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (!session) {
        return null
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
                            Welcome back, {session.user?.name || session.user?.email}!
                        </p>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}