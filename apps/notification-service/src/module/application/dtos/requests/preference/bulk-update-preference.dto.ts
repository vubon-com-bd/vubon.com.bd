import { z } from 'zod';
import { NotificationPreferenceTypeSchema } from '@vubon/shared-schemas/platform/notification';

export const BulkUpdatePreferenceSchema = z.object({
  updates: z.array(
    z.object({
      type: NotificationPreferenceTypeSchema,
      option: z.string().min(1).max(50),
      value: z.union([z.string(), z.boolean(), z.number()]),
    }),
  ).min(1).max(100),
});

export type BulkUpdatePreferenceRequestDTO = z.infer<typeof BulkUpdatePreferenceSchema>;
