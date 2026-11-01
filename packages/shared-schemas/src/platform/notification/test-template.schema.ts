/**
 * Test Notification Template Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { EmailSchema } from '../../common/primitives/email.schema.js';
import { PhoneSchema } from '../../common/primitives/phone.schema.js';

export const TestNotificationTemplateRequestSchema = z
  .object({
    templateId: UuidSchema,
    email: EmailSchema.optional(),
    phone: PhoneSchema.optional(),
    deviceToken: z.string().min(1).max(500).optional(),
    variables: z.record(z.string(), z.unknown()),
    locale: z.string().min(2).max(10).optional(),
  })
  .strict()
  .refine(
    (d) => Boolean(d.email || d.phone || d.deviceToken),
    { message: 'At least one delivery target is required' },
  );

export type TestNotificationTemplateRequestSchemaType = z.infer<
  typeof TestNotificationTemplateRequestSchema
>;
