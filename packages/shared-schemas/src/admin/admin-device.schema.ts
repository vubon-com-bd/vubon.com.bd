import { z } from 'zod';
import { AuthDeviceSchema } from '../auth/auth-device.schema';

export const AdminDeviceSchema = AuthDeviceSchema.extend({
  adminId: z.string().uuid(),
  isTrusted: z.boolean().default(false),
  isActive: z.boolean().default(true),
});
