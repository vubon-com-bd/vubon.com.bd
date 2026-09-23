import { z } from 'zod';

export const RegisterVehicleRequestSchema = z.object({
  vehicleNumber: z.string().min(2).max(30),
  type: z.string().min(1),
  capacity: z.number().positive().optional(),
  fuelType: z.string().optional(),
});

export type RegisterVehicleRequestDTO = z.infer<typeof RegisterVehicleRequestSchema>;
