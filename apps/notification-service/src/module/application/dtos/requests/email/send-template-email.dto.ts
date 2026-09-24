import { z } from 'zod';

export const SendTemplateEmailSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email()).min(1)]),
  templateName: z.string().min(1).max(100),
  variables: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  locale: z.string().min(2).max(10).optional(),
  scheduledAt: z.string().datetime().optional(),
});

export type SendTemplateEmailRequestDTO = z.infer<typeof SendTemplateEmailSchema>;
