import { z } from 'zod';
import { CourierTypeSchema, CourierNameSchema } from '@vubon/shared-schemas/logistics';

export const RegisterCourierRequestSchema = z.object({
  name: CourierNameSchema,
  type: CourierTypeSchema,
  apiUrl: z.string().url().optional(),
  apiKey: z.string().min(1).max(500).optional(),
});

export type RegisterCourierRequestDTO = z.infer<typeof RegisterCourierRequestSchema>;
