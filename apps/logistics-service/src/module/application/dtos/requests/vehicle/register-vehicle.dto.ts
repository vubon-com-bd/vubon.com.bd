import { z } from 'zod';
import { VehicleTypeSchema, VehicleFuelTypeSchema } from '@vubon/shared-schemas/logistics';

export const RegisterVehicleRequestSchema = z.object({
  vehicleNumber: z.string().min(2).max(30),
  type: VehicleTypeSchema,
  capacity: z.number().positive().optional(),
  fuelType: VehicleFuelTypeSchema.optional(),
});

export type RegisterVehicleRequestDTO = z.infer<typeof RegisterVehicleRequestSchema>;
