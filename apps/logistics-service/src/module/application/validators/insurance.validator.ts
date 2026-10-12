/**
 * Insurance application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import { InsuranceSchema, InsuranceClaimSchema } from '@vubon/shared-schemas/logistics';

export const InsuranceCreateValidator = InsuranceSchema.omit({
  id: true, createdAt: true, updatedAt: true, deletedAt: true,
});
export const InsuranceClaimValidator = InsuranceClaimSchema.omit({
  id: true, createdAt: true, updatedAt: true, deletedAt: true,
});
export type InsuranceCreateValidated = z.infer<typeof InsuranceCreateValidator>;
