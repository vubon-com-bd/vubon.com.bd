import { z } from 'zod';

export const SetVehicleStatusRequestSchema = z.object({
  vehicleId: z.string().uuid(),
  status: z.enum(['available', 'in_use', 'maintenance', 'out_of_service']),
});

export type SetVehicleStatusRequestDTO = z.infer<typeof SetVehicleStatusRequestSchema>;
