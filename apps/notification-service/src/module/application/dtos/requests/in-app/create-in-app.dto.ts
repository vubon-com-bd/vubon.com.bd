import { z } from 'zod';

export const CreateInAppSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  position: z.enum(['top', 'bottom', 'center', 'toast']).default('top'),
  actionUrl: z.string().url().optional(),
  autoDismissMs: z.number().int().positive().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});

export type CreateInAppRequestDTO = z.infer<typeof CreateInAppSchema>;
