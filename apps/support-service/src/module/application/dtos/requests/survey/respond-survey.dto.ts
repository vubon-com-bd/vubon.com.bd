import { z } from 'zod';

export const RespondSurveyRequestSchema = z.object({
  surveyId: z.string().uuid(),
  userId: z.string().uuid(),
  answers: z.record(z.string(), z.unknown()),
});

export type RespondSurveyRequestDTO = z.infer<typeof RespondSurveyRequestSchema>;
