/**
 * Attribute Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/attribute.constants থেকে।
 */

import { z } from 'zod';
import { ATTRIBUTE_TYPE, ATTRIBUTE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const AttributeTypeSchema = z.enum(Object.values(ATTRIBUTE_TYPE) as [string, ...string[]]);

export const AttributeOptionSchema = z.object({
  value: z.string().min(1).max(ATTRIBUTE.VALUE_MAX_LENGTH),
  label: z.string().min(1).max(ATTRIBUTE.VALUE_MAX_LENGTH),
  sortOrder: z.number().int().min(0),
});

export const AttributeSchema = z.object({
  id: UuidSchema,
  name: z.string().trim().min(1).max(ATTRIBUTE.NAME_MAX_LENGTH),
  slug: z.string().min(1).max(120),
  type: AttributeTypeSchema,
  isRequired: z.boolean(),
  isSearchable: z.boolean(),
  isFilterable: z.boolean(),
  unit: z.string().max(20).optional(),
  options: z.array(AttributeOptionSchema).max(ATTRIBUTE.MAX_OPTIONS).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ProductAttributeSchema = z.object({
  attributeId: UuidSchema,
  name: z.string().min(1).max(ATTRIBUTE.NAME_MAX_LENGTH),
  values: z
    .array(
      z.object({
        attributeId: UuidSchema,
        value: z.union([
          z.string().max(ATTRIBUTE.VALUE_MAX_LENGTH),
          z.number(),
          z.boolean(),
          z.array(z.string()),
        ]),
      })
    )
    .max(50),
});

export type AttributeTypeSchemaType = z.infer<typeof AttributeTypeSchema>;
export type AttributeSchemaType = z.infer<typeof AttributeSchema>;
export type ProductAttributeSchemaType = z.infer<typeof ProductAttributeSchema>;
