'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { UserRole } from '@/types/auth';
import { canAccessRoute, isReadOnlyRole } from '@/lib/auth/guards';
import { useSession } from '@/lib/auth/session';

const ROLE_LABEL: Record<UserRole, string> = { agent: 'Agent', operations: 'Operations Manager', admin: 'Auditor / Admin', judge: 'Judge' };
export function RouteGuard({ pathname, children }: { pathname: string; children: ReactNode }) {
  const { role, session } = useSession();
  if (!canAccessRoute(role, pathname)) return <section className="container section-pad" aria-labelledby="access-title"><div className="notice-card" role="alert"><span className="eyebrow">Access restricted</span><h1 id="access-title">This area isn’t available for the active role.</h1><p>You’re viewing FloatPilot as <strong>{session.user.name}</strong> ({ROLE_LABEL[role]}). Switch to an authorised persona to preview this area.</p><Link className="btn-primary inline-flex" href="/demo">Return to demo</Link></div></section>;
  return <>{isReadOnlyRole(role) && pathname !== '/judge' ? <div className="container"><p className="role-readonly" role="status">Read-only preview · No operational actions are available to the Judge persona.</p></div> : null}{children}</>;
}
