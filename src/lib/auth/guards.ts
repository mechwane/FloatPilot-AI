import type { Permission, UserRole } from '@/types/auth';

const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  agent: ['agent:read', 'demo:read', 'scenario:select'],
  operations: ['agent:read', 'operations:read', 'demo:read', 'scenario:select'],
  admin: ['agent:read', 'operations:read', 'admin:read', 'demo:read', 'scenario:select'],
  judge: ['judge:read', 'demo:read', 'scenario:select'],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  if (pathname === '/agent' || pathname.startsWith('/agent/')) return hasPermission(role, 'agent:read');
  if (pathname === '/operations' || pathname.startsWith('/operations/')) return hasPermission(role, 'operations:read');
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return role === 'admin';
  if (pathname === '/judge' || pathname.startsWith('/judge/')) return true; // Scoring preview is read-only for every persona.
  return true;
}

export function isReadOnlyRole(role: UserRole): boolean { return role === 'judge'; }
