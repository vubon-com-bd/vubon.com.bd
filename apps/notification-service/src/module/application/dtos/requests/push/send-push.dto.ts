import { z } from 'zod';

export const SendPushSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(500),
  icon: z.string().url().optional(),
  image: z.string().url().optional(),
  clickAction: z.string().url().optional(),
  data: z.record(z.string(), z.string()).optional(),
});

export type SendPushRequestDTO = z.infer<typeof SendPushSchema>;
