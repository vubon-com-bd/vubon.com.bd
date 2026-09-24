import { z } from 'zod';

export const SendSmsSchema = z.object({
  to: z.union([z.string().min(10).max(20), z.array(z.string().min(10).max(20)).min(1)]),
  body: z.string().min(1).max(1600),
  from: z.string().max(20).optional(),
});

export type SendSmsRequestDTO = z.infer<typeof SendSmsSchema>;
