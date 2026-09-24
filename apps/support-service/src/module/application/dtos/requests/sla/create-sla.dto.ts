import { z } from 'zod';

export const CreateSlaRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(1).max(50),
  target: z.number().int().positive(),
  priority: z.string().min(1).max(50),
  businessHoursOnly: z.boolean().optional(),
});

export type CreateSlaRequestDTO = z.infer<typeof CreateSlaRequestSchema>;
