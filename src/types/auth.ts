export const USER_ROLES = ['agent', 'operations', 'admin', 'judge'] as const;
export type UserRole = (typeof USER_ROLES)[number];
export type Permission = 'agent:read' | 'operations:read' | 'admin:read' | 'judge:read' | 'demo:read' | 'scenario:select';
export interface SyntheticUser { id: string; name: string; title: string; role: UserRole; description: string; }
export interface SessionState { user: SyntheticUser; isAuthenticated: true; mode: 'synthetic'; }
export interface AuthContextValue { session: SessionState; role: UserRole; switchRole: (role: UserRole) => void; }
