import { z } from 'zod';

export const SendBulkPushSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1).max(10000),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(500),
  icon: z.string().url().optional(),
  image: z.string().url().optional(),
  clickAction: z.string().url().optional(),
  data: z.record(z.string(), z.string()).optional(),
});

export type SendBulkPushRequestDTO = z.infer<typeof SendBulkPushSchema>;
