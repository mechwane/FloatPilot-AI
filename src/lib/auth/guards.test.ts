import { describe, expect, it } from 'vitest';
import { canAccessRoute, hasPermission, isReadOnlyRole } from './guards';
import { USER_ROLES, type UserRole } from '@/types/auth';

describe('synthetic role route access', () => {
  const expected: Record<UserRole, Record<string, boolean>> = {
    agent: { '/agent': true, '/operations': false, '/admin': false, '/judge': true },
    operations: { '/agent': true, '/operations': true, '/admin': false, '/judge': true },
    admin: { '/agent': true, '/operations': true, '/admin': true, '/judge': true },
    judge: { '/agent': false, '/operations': false, '/admin': false, '/judge': true },
  };
  it.each(USER_ROLES)('checks every protected route for %s', (role) => {
    for (const [route, allowed] of Object.entries(expected[role])) expect(canAccessRoute(role, route)).toBe(allowed);
  });
  it('allows nested protected paths consistently', () => {
    expect(canAccessRoute('operations', '/agent/activity')).toBe(true);
    expect(canAccessRoute('agent', '/operations/review')).toBe(false);
    expect(canAccessRoute('admin', '/admin/audit')).toBe(true);
  });
  it('keeps the judge persona read-only', () => {
    expect(isReadOnlyRole('judge')).toBe(true);
    expect(isReadOnlyRole('admin')).toBe(false);
  });
  it('exposes only the permissions assigned to a role', () => {
    expect(hasPermission('agent', 'agent:read')).toBe(true);
    expect(hasPermission('agent', 'admin:read')).toBe(false);
    expect(hasPermission('admin', 'admin:read')).toBe(true);
  });
});
