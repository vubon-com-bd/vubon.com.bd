/**
 * Add Contact Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { ContactTypeSchema } from './user-contact.schema';

export const AddContactRequestSchema = z
  .object({
    type: ContactTypeSchema,
    value: z.string().min(1).max(255),
    label: z.string().trim().max(50).optional(),
    isPrimary: z.boolean().optional().default(false),
  })
  .strict();

export type AddContactRequestSchemaType = z.infer<typeof AddContactRequestSchema>;
