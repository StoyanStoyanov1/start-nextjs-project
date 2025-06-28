// import { NextAuthOptions } from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import GoogleProvider from 'next-auth/providers/google'
//
// export const authOptions: NextAuthOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'email' },
//                 password: { label: 'Password', type: 'password' }
//             },
//             async authorize(credentials) {
//                 const response = await fetch('YOUR_BACKEND_URL/auth/login', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(credentials)
//                 })
//
//                 if (response.ok) {
//                     const user = await response.json()
//                     return user
//                 }
//                 return null
//             }
//         })
//     ],
// }

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                // Временно за тестване
                if (credentials?.email === 'test@test.com' && credentials?.password === 'test') {
                    return {
                        id: '1',
                        email: 'test@test.com',
                        name: 'Test User'
                    }
                }
                return null
            }
        })
    ],
}