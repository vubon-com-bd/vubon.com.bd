import { z } from 'zod';
import { AuthSessionSchema } from '../auth/auth-session.schema';

/**
 * Internal AdminSession entity.
 * ⚠️ AuthSessionSchema carries raw `token` (@internal) — never serialize.
 */
export const AdminSessionSchema = AuthSessionSchema.extend({
  adminId: z.string().uuid(),
  isActive: z.boolean().default(true),
});

/**
 * Public-safe AdminSession DTO — no raw token.
 */
export const AdminSessionPublicSchema = AdminSessionSchema.omit({
  token: true,
}).extend({
  tokenPreview: z.string().max(12),
});
