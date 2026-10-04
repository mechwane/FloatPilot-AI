import type { Metadata } from 'next';
import './globals.css';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
export const metadata: Metadata = { title:'FloatPilot AI — See liquidity risk earlier', description:'A synthetic decision-support demonstration for liquidity planning.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3" href="#main">Skip to content</a><PublicHeader/><main id="main">{children}</main><PublicFooter/></body></html>}
