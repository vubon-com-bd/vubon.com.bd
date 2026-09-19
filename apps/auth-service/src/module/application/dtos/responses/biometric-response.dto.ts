import { z } from 'zod';

export const BiometricResponseSchema = z.object({
  enabled: z.boolean(),
  biometricId: z.string().optional(),
  enrolledAt: z.string().datetime().optional(),
});

export type BiometricResponseDTO = z.infer<typeof BiometricResponseSchema>;
