/**
 * Vehicle application validator
 * @module logistics-service/application/validators
 */
import { z } from 'zod';
import { VehicleSchema } from '@vubon/shared-schemas/logistics';

export const VehicleRegisterValidator = VehicleSchema.omit({
  id: true, createdAt: true, updatedAt: true, deletedAt: true,
});
export type VehicleRegisterValidated = z.infer<typeof VehicleRegisterValidator>;
