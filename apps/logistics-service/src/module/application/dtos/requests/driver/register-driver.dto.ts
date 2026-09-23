import { z } from 'zod';
import { DriverTypeSchema } from '@vubon/shared-schemas/logistics';

export const RegisterDriverRequestSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  licenseNo: z.string().min(6).max(30),
  type: DriverTypeSchema,
});

export type RegisterDriverRequestDTO = z.infer<typeof RegisterDriverRequestSchema>;
