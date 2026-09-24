import { z } from 'zod';

export const SendBulkSmsSchema = z.object({
  recipients: z.array(
    z.object({
      to: z.string().min(10).max(20),
      variables: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
    }),
  ).min(1).max(10000),
  templateName: z.string().min(1).max(100).optional(),
  body: z.string().min(1).max(1600).optional(),
});

export type SendBulkSmsRequestDTO = z.infer<typeof SendBulkSmsSchema>;
