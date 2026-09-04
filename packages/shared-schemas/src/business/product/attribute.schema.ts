/**
 * Attribute Schema
 * অ্যাট্রিবিউট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ATTRIBUTE_TYPES } from '@vubon/shared-constants';

const AttributeOptionSchema = z.object({
  id: z.string().uuid(),
  value: z.string().min(1, 'Option value is required'),
  valueBangla: z.string().optional(),
  sortOrder: z.number().int().min(0).default(0),
});

const ValidationRulesSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional(),
  pattern: z.string().optional(),
  allowedValues: z.array(z.string()).optional(),
});

export const AttributeSchema = BaseSchema.extend({
  name: z.string().min(1, 'Attribute name is required'),
  nameBangla: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  type: z.enum(Object.values(ATTRIBUTE_TYPES) as [string, ...string[]]),
  options: z.array(AttributeOptionSchema).default([]),
  isRequired: z.boolean().default(false),
  isFilterable: z.boolean().default(false),
  isSearchable: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  group: z.string().optional(),
  description: z.string().optional(),
  validationRules: ValidationRulesSchema.optional(),
});

export const AttributeCreateSchema = AttributeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const AttributeUpdateSchema = AttributeCreateSchema.partial();

export type Attribute = z.infer<typeof AttributeSchema>;
export type AttributeCreate = z.infer<typeof AttributeCreateSchema>;
export type AttributeUpdate = z.infer<typeof AttributeUpdateSchema>;
