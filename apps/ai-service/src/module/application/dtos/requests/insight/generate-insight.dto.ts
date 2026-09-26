import { z } from 'zod';
import { AiInsightTypeSchema, AiInsightPrioritySchema } from '@vubon/shared-schemas/ai';

export const GenerateInsightSchema = z.object({
  target: z.string().min(1),
  type: AiInsightTypeSchema,
  priority: AiInsightPrioritySchema.default('medium'),
  findings: z.array(z.object({
    label: z.string().min(1),
    value: z.number(),
    unit: z.string().nullable().optional(),
  })).min(1),
  confidence: z.number().min(0).max(1),
});

export type GenerateInsightRequestDTO = z.infer<typeof GenerateInsightSchema>;
