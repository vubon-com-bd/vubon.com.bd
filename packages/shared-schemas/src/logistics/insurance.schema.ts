/**
 * Insurance Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/insurance.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../common/primitives/money.schema';
import {
  INSURANCE_STATUS,
  INSURANCE_TYPE,
  INSURANCE_COVERAGE,
  INSURANCE_CLAIM_STATUS,
} from '@vubon/shared-constants/logistics';

export const InsuranceStatusSchema = z.enum(
  Object.values(INSURANCE_STATUS) as [string, ...string[]]
);

export const InsuranceTypeSchema = z.enum(Object.values(INSURANCE_TYPE) as [string, ...string[]]);

export const InsuranceCoverageSchema = z.enum(
  Object.values(INSURANCE_COVERAGE) as [string, ...string[]]
);

export const InsuranceClaimStatusSchema = z.enum(
  Object.values(INSURANCE_CLAIM_STATUS) as [string, ...string[]]
);

export const InsuranceSchema = BaseEntitySchema.extend({
  policyNumber: z.string().min(1).max(50),
  shipmentId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  userId: UuidSchema.optional(),
  status: InsuranceStatusSchema,
  type: InsuranceTypeSchema,
  coverages: z.array(InsuranceCoverageSchema).min(1).max(10),
  declaredValue: PositiveMoneySchema,
  premium: PositiveMoneySchema,
  currency: z.string().length(3),
  startsAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  isClaimed: z.boolean(),
});

export const InsurancePublicSchema = InsuranceSchema.pick({
  id: true,
  policyNumber: true,
  status: true,
  type: true,
  declaredValue: true,
  premium: true,
  currency: true,
});

export const InsuranceClaimSchema = BaseEntitySchema.extend({
  insuranceId: UuidSchema,
  claimNumber: z.string().min(1).max(50),
  status: InsuranceClaimStatusSchema,
  reason: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).max(10).optional(),
  amount: PositiveMoneySchema,
  currency: z.string().length(3),
  approvedAmount: PositiveMoneySchema.optional(),
  submittedAt: z.string().datetime(),
  reviewedAt: z.string().datetime().optional(),
  approvedAt: z.string().datetime().optional(),
  rejectedAt: z.string().datetime().optional(),
  rejectionReason: z.string().max(1000).optional(),
  paidAt: z.string().datetime().optional(),
});

export type InsuranceStatusSchemaType = z.infer<typeof InsuranceStatusSchema>;
export type InsuranceTypeSchemaType = z.infer<typeof InsuranceTypeSchema>;
export type InsuranceSchemaType = z.infer<typeof InsuranceSchema>;
export type InsurancePublicSchemaType = z.infer<typeof InsurancePublicSchema>;
export type InsuranceClaimSchemaType = z.infer<typeof InsuranceClaimSchema>;
