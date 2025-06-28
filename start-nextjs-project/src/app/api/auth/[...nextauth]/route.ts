import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }