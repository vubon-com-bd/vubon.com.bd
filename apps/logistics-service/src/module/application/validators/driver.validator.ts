/**
 * Driver application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import { DriverSchema } from '@vubon/shared-schemas/logistics';

export const DriverRegisterValidator = DriverSchema.omit({
  id: true, createdAt: true, updatedAt: true, deletedAt: true,
});
export type DriverRegisterValidated = z.infer<typeof DriverRegisterValidator>;
