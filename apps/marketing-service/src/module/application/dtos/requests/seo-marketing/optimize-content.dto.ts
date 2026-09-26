import { z } from 'zod';

export const OptimizeContentRequestSchema = z.object({
  pageUrl: z.string().url(),
  title: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  keywords: z.array(z.string()).optional(),
});

export type OptimizeContentRequestDTO = z.infer<typeof OptimizeContentRequestSchema>;
