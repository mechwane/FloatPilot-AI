'use client';
import { useSession, SYNTHETIC_PERSONAS } from '@/lib/auth/session';
import type { UserRole } from '@/types/auth';
const ROLES: UserRole[] = ['agent', 'operations', 'admin', 'judge'];
export function RoleSwitcher() {
  const { role, switchRole } = useSession();
  return <label className="role-switcher"><span className="sr-only">Switch demo persona</span><span aria-hidden="true" className="role-switcher-label">Viewing as</span><select aria-label="Switch demo persona" value={role} onChange={(event) => switchRole(event.target.value as UserRole)}>{ROLES.map((item) => <option key={item} value={item}>{SYNTHETIC_PERSONAS[item].title}</option>)}</select></label>;
}
