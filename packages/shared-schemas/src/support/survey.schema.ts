import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { SURVEY } from '@vubon/shared-constants/src/support/survey.constants';

const surveyTypeKeys = Object.keys(SURVEY.SURVEY_TYPES) as [string, ...string[]];
const surveyStatusKeys = Object.keys(SURVEY.STATUS) as [string, ...string[]];

export const SurveySchema = BaseSchema.extend({
  surveyId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  type: z.enum(surveyTypeKeys),
  status: z.enum(surveyStatusKeys),
  questions: z.array(
    z.object({
      questionId: z.string().uuid(),
      type: z.enum(['text', 'textarea', 'radio', 'checkbox', 'select', 'rating', 'scale']),
      question: z.string(),
      description: z.string().optional(),
      options: z.array(z.string()).optional(),
      required: z.boolean().default(false),
      order: z.number().int().min(0),
    })
  ),
  createdBy: z.string().uuid(),
  createdByUser: UserSchema,
  targetAudience: z.array(z.string()),
  responseCount: z.number().int().min(0).default(0),
  maxResponses: z.number().int().min(0).optional(),
  startsAt: z.date(),
  endsAt: z.date(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
