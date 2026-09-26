import { z } from 'zod';

export const UpdateVehicleRequestSchema = z.object({
  vehicleId: z.string().uuid(),
  capacity: z.number().positive().optional(),
  fuelType: z.enum(['petrol', 'diesel', 'cng', 'electric', 'hybrid']).optional(),
});

export type UpdateVehicleRequestDTO = z.infer<typeof UpdateVehicleRequestSchema>;
