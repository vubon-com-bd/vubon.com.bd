import { z } from 'zod';
import { AuthSessionSchema } from '../auth/auth-session.schema';

export const AdminSessionSchema = AuthSessionSchema.extend({
  adminId: z.string().uuid(),
  isActive: z.boolean().default(true),
});
