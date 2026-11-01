/**
 * Send Digest Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const SendNotificationDigestRequestSchema = z
  .object({
    digestId: UuidSchema,
    force: z.boolean().optional(),
    notifyChannels: z
      .array(z.enum(['email', 'push', 'in_app']))
      .min(1)
      .max(3)
      .optional(),
  })
  .strict();

export type SendNotificationDigestRequestSchemaType = z.infer<
  typeof SendNotificationDigestRequestSchema
>;
