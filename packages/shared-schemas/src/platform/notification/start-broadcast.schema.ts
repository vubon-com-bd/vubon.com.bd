/**
 * Start Broadcast Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const StartNotificationBroadcastRequestSchema = z
  .object({
    broadcastId: UuidSchema,
    approvedBy: UuidSchema.optional(),
    testMode: z.boolean().optional(),
    testRecipientIds: z.array(UuidSchema).max(10).optional(),
  })
  .strict()
  .refine(
    (d) => !d.testMode || (d.testRecipientIds && d.testRecipientIds.length > 0),
    { message: 'testMode requires testRecipientIds', path: ['testRecipientIds'] },
  );

export type StartNotificationBroadcastRequestSchemaType = z.infer<
  typeof StartNotificationBroadcastRequestSchema
>;
