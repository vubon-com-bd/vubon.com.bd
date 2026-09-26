import { z } from 'zod';
import { NotificationPreferenceTypeSchema } from '@vubon/shared-schemas/platform/notification';

export const UpdatePreferenceSchema = z.object({
  type: NotificationPreferenceTypeSchema,
  option: z.string().min(1).max(50),
  value: z.union([z.string(), z.boolean(), z.number()]),
});

export type UpdatePreferenceRequestDTO = z.infer<typeof UpdatePreferenceSchema>;
