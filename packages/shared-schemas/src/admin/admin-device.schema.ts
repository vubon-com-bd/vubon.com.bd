import { z } from 'zod';
import { AuthDeviceSchema } from '../auth/auth-device.schema';

/**
 * AdminDevice extends AuthDeviceSchema.
 * Note: isTrusted is already present on AuthDeviceSchema — do not duplicate.
 */
export const AdminDeviceSchema = AuthDeviceSchema.extend({
  adminId: z.string().uuid(),
  isActive: z.boolean().default(true),
});
