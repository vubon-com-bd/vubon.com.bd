import { z } from 'zod';

export const SendBulkEmailSchema = z.object({
  recipients: z.array(
    z.object({
      to: z.string().email(),
      variables: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
    }),
  ).min(1).max(10000),
  templateName: z.string().min(1).max(100),
  locale: z.string().min(2).max(10).optional(),
});

export type SendBulkEmailRequestDTO = z.infer<typeof SendBulkEmailSchema>;
