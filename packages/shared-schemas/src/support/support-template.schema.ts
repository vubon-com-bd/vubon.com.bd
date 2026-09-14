/**
 * Support Template Schema
 * @module shared-schemas/support
 *
 * ⚠️ Note: TemplateVariable → SupportTemplateVariable, কারণ notification/-এর সাথে conflict এড়াতে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';

export const SupportTemplateTypeSchema = z.enum([
  'email',
  'sms',
  'push',
  'in_app',
  'auto_reply',
  'signature',
  'macro',
]);

export const SupportTemplateStatusSchema = z.enum(['draft', 'active', 'inactive', 'archived']);

export const SupportTemplateVariableSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(['string', 'number', 'boolean', 'date']),
  required: z.boolean(),
  defaultValue: z.string().max(500).optional(),
  description: z.string().max(500).optional(),
});

export const SupportTemplateSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  slug: z.string().min(1).max(150),
  type: SupportTemplateTypeSchema,
  status: SupportTemplateStatusSchema,
  locale: z.string().min(2).max(10),
  subject: z.string().max(200).optional(),
  body: z.string().min(1).max(500000),
  variables: z.array(SupportTemplateVariableSchema).max(50),
  version: z.number().int().positive(),
  createdBy: z.string().min(1),
  updatedBy: z.string().optional(),
});

export const SupportTemplatePublicSchema = SupportTemplateSchema.pick({
  id: true,
  name: true,
  slug: true,
  type: true,
  status: true,
  locale: true,
  version: true,
});

export type SupportTemplateTypeSchemaType = z.infer<typeof SupportTemplateTypeSchema>;
export type SupportTemplateStatusSchemaType = z.infer<typeof SupportTemplateStatusSchema>;
export type SupportTemplateSchemaType = z.infer<typeof SupportTemplateSchema>;
export type SupportTemplatePublicSchemaType = z.infer<typeof SupportTemplatePublicSchema>;
