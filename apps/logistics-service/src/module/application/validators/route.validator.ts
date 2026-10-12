/**
 * Route application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import { RouteSchema } from '@vubon/shared-schemas/logistics';

export const RouteCreateValidator = RouteSchema.omit({
  id: true, createdAt: true, updatedAt: true, deletedAt: true,
});
export type RouteCreateValidated = z.infer<typeof RouteCreateValidator>;
