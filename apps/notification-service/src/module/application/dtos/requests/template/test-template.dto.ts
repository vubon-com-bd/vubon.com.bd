import { z } from 'zod';

export const TestTemplateSchema = z.object({
  templateName: z.string().min(1).max(100),
  recipientEmail: z.string().email(),
  variables: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
});

export type TestTemplateRequestDTO = z.infer<typeof TestTemplateSchema>;
