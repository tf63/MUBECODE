import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'MUBECODE',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <div className="p-5">{children}</div>
            </body>
        </html>
    )
}
