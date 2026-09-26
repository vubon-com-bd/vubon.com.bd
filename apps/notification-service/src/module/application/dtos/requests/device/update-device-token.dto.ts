import { z } from 'zod';

export const UpdateDeviceTokenSchema = z.object({
  deviceId: z.string().uuid(),
  token: z.string().min(10).max(4096),
});

export type UpdateDeviceTokenRequestDTO = z.infer<typeof UpdateDeviceTokenSchema>;
