import { z } from 'zod';
import {
  NotificationDeviceTypeSchema,
} from '@vubon/shared-schemas/platform/notification';

export const RegisterDeviceSchema = z.object({
  type: NotificationDeviceTypeSchema,
  platform: z.enum(['ios', 'android', 'web', 'desktop', 'other']),
  token: z.string().min(10).max(4096),
  fingerprint: z.string().max(200).optional(),
});

export type RegisterDeviceRequestDTO = z.infer<typeof RegisterDeviceSchema>;
