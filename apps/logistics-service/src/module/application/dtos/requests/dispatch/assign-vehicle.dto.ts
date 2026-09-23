import { z } from 'zod';

export const AssignVehicleRequestSchema = z.object({
  dispatchId: z.string().uuid(),
  vehicleId: z.string().uuid(),
});

export type AssignVehicleRequestDTO = z.infer<typeof AssignVehicleRequestSchema>;
