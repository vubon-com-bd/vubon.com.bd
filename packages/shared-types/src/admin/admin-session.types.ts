import { AuthSession } from '../auth/auth-session.types';
import { AdminPublic } from './admin.types';

/**
 * Admin session interface (internal entity)
 *
 * ⚠️ SECURITY: `AuthSession` carries a raw `token` field marked @internal.
 * NEVER return this type directly to clients — use `AdminSessionPublic`.
 *
 * Design notes:
 * - `adminId` is the reference (foreign key).
 * - `admin: AdminPublic` is a denormalized summary for convenience,
 *   populated only when the session is served in a management context.
 */
export interface AdminSession extends AuthSession {
  adminId: string;
  /** Populated summary — not part of the session row itself */
  admin: AdminPublic;
  isActive: boolean;
}

/**
 * Public-safe AdminSession DTO — never expose raw token.
 * Mirrors `AuthSessionPublic` shape and adds admin fields.
 */
export type AdminSessionPublic = Omit<AdminSession, 'token' | 'admin'> & {
  tokenPreview: string;
  admin?: AdminPublic;
};
