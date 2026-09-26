/**
 * Courier Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/courier.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { COURIER_STATUS, COURIER_TYPE, COURIER_NAME } from '@vubon/shared-constants/logistics';

export const CourierStatusSchema = z.enum(Object.values(COURIER_STATUS) as [string, ...string[]]);

export const CourierTypeSchema = z.enum(Object.values(COURIER_TYPE) as [string, ...string[]]);

export const CourierNameSchema = z.enum(Object.values(COURIER_NAME) as [string, ...string[]]);

export const CourierSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  code: z.union([CourierNameSchema, z.string().min(1).max(50)]),
  displayName: z.string().min(1).max(150),
  type: CourierTypeSchema,
  status: CourierStatusSchema,
  logoUrl: z.string().url().optional(),
  website: z.string().url().optional(),
  contactPhone: PhoneSchema.optional(),
  contactEmail: EmailSchema.optional(),
  trackingUrlTemplate: z.string().max(500).optional(),
  apiEnabled: z.boolean(),
  coverageZones: z.array(z.string().max(100)).max(100).optional(),
  supportsCOD: z.boolean(),
  supportsInsurance: z.boolean(),
  supportsInternational: z.boolean(),
  averageDeliveryDays: z.number().positive().max(90),
  isDefault: z.boolean(),
  priority: z.number().int().min(0).max(100),
});

export const CourierPublicSchema = CourierSchema.pick({
  id: true,
  name: true,
  displayName: true,
  type: true,
  status: true,
  logoUrl: true,
  supportsCOD: true,
});

export const CourierListFilterSchema = z.object({
  status: CourierStatusSchema.optional(),
  type: CourierTypeSchema.optional(),
  supportsCOD: z.boolean().optional(),
  supportsInternational: z.boolean().optional(),
  search: z.string().max(200).optional(),
});

export type CourierStatusSchemaType = z.infer<typeof CourierStatusSchema>;
export type CourierTypeSchemaType = z.infer<typeof CourierTypeSchema>;
export type CourierSchemaType = z.infer<typeof CourierSchema>;
export type CourierPublicSchemaType = z.infer<typeof CourierPublicSchema>;
export type CourierListFilterSchemaType = z.infer<typeof CourierListFilterSchema>;
