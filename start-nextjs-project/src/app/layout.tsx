import { ReduxProvider } from '@/store/providers'
import { NextAuthProvider } from '@/lib/session-provider'
import './globals.css'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <NextAuthProvider>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </NextAuthProvider>
        </body>
        </html>
    )
}