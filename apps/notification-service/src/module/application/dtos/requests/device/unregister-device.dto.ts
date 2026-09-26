import { z } from 'zod';

export const UnregisterDeviceSchema = z.object({
  deviceId: z.string().uuid(),
});

export type UnregisterDeviceRequestDTO = z.infer<typeof UnregisterDeviceSchema>;
