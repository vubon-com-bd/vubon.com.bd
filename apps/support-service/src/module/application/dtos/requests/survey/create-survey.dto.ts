import { z } from 'zod';

export const CreateSurveyRequestSchema = z.object({
  title: z.string().min(3).max(200),
  type: z.string().min(1).max(50),
  questions: z.array(z.object({
    question: z.string().min(1).max(1000),
    type: z.enum(['text', 'rating', 'single_choice', 'multiple_choice']),
    options: z.array(z.string()).optional(),
    required: z.boolean().optional(),
  })).min(1),
});

export type CreateSurveyRequestDTO = z.infer<typeof CreateSurveyRequestSchema>;
