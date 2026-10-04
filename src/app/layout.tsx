import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { SessionProvider } from '@/lib/auth/session';
export const metadata: Metadata = { title:'FloatPilot AI — See liquidity risk earlier', description:'A synthetic decision-support demonstration for liquidity planning.' };
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body><SessionProvider><a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3" href="#main">Skip to content</a><PublicHeader/><main id="main">{children}</main><PublicFooter/></SessionProvider></body></html>}
