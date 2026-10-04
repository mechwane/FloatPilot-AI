'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AuthContextValue, SessionState, SyntheticUser, UserRole } from '@/types/auth';

export const SYNTHETIC_PERSONAS: Record<UserRole, SyntheticUser> = {
  agent: { id: 'demo-agent-001', name: 'Tomi Adeyemi', title: 'Bank Agent', role: 'agent', description: 'Manages day-to-day cash and e-float needs.' },
  operations: { id: 'demo-ops-001', name: 'Chidi Okafor', title: 'Operations Manager', role: 'operations', description: 'Reviews liquidity across the agent cluster.' },
  admin: { id: 'demo-admin-001', name: 'Mariam Bello', title: 'Auditor / Admin', role: 'admin', description: 'Reviews administrative and audit information.' },
  judge: { id: 'demo-judge-001', name: 'Alex Morgan', title: 'Hackathon Judge', role: 'judge', description: 'Read-only access for evaluating the prototype.' },
};

const SessionContext = createContext<AuthContextValue | null>(null);
export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('judge');
  const switchRole = useCallback((nextRole: UserRole) => setRole(nextRole), []);
  const session = useMemo<SessionState>(() => ({ user: SYNTHETIC_PERSONAS[role], isAuthenticated: true, mode: 'synthetic' }), [role]);
  const value = useMemo(() => ({ session, role, switchRole }), [session, role, switchRole]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}
