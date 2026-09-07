import { z } from 'zod';
import { AuthVerificationSchema } from '../auth/auth-verification.schema';

export const AdminVerificationSchema = AuthVerificationSchema.extend({
  adminId: z.string().uuid(),
  type: z.enum(['email', 'phone', 'document', 'background_check']),
  status: z.enum(['pending', 'approved', 'rejected']),
});
