import { z } from 'zod';

export const RegisterCourierRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.enum(['local', 'national', 'international', 'third_party', 'in_house', 'marketplace']),
  apiUrl: z.string().url().optional(),
  apiKey: z.string().max(500).optional(),
});

export type RegisterCourierRequestDTO = z.infer<typeof RegisterCourierRequestSchema>;
