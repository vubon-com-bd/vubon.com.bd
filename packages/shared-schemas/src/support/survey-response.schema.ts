import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';

export const SurveyResponseSchema = BaseSchema.extend({
  responseId: z.string().uuid(),
  surveyId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      answer: z.unknown(),
    })
  ),
  isCompleted: z.boolean().default(false),
  startedAt: z.date(),
  completedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
