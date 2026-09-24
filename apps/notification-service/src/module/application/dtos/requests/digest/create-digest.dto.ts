import { z } from 'zod';
import {
  NotificationDigestTypeSchema,
  NotificationDigestFrequencySchema,
} from '@vubon/shared-schemas/platform/notification';

export const CreateDigestSchema = z.object({
  userId: z.string().uuid(),
  type: NotificationDigestTypeSchema,
  frequency: NotificationDigestFrequencySchema,
  scheduledAt: z.string().datetime(),
});

export type CreateDigestRequestDTO = z.infer<typeof CreateDigestSchema>;
