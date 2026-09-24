import { z } from 'zod';

export const CloseSurveyRequestSchema = z.object({
  surveyId: z.string().uuid(),
});

export type CloseSurveyRequestDTO = z.infer<typeof CloseSurveyRequestSchema>;
