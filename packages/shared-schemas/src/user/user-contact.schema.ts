/**
 * User Contact Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-contact.constants থেকে।
 */

import { z } from 'zod';
import { USER_CONTACT_TYPE } from '@vubon/shared-constants/user';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const ContactTypeSchema = z.enum(Object.values(USER_CONTACT_TYPE) as [string, ...string[]]);

export const UserContactSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  type: ContactTypeSchema,
  value: z.string().min(1).max(255),
  label: z.string().trim().max(50).optional(),
  isPrimary: z.boolean(),
  isVerified: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const UserContactPublicSchema = UserContactSchema.omit({
  userId: true,
});

export const UserContactInputSchema = z.object({
  type: ContactTypeSchema,
  value: z.string().min(1).max(255),
  label: z.string().trim().max(50).optional(),
  isPrimary: z.boolean().optional().default(false),
});

export type ContactTypeSchemaType = z.infer<typeof ContactTypeSchema>;
export type UserContactSchemaType = z.infer<typeof UserContactSchema>;
export type UserContactPublicSchemaType = z.infer<typeof UserContactPublicSchema>;
export type UserContactInputSchemaType = z.infer<typeof UserContactInputSchema>;
