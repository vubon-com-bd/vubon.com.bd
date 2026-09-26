/**
 * Survey Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/survey.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import {
  SURVEY_TYPE,
  SURVEY_STATUS,
  SURVEY_QUESTION_TYPE,
  SURVEY,
} from '@vubon/shared-constants/support';

export const SurveyTypeSchema = z.enum(Object.values(SURVEY_TYPE) as [string, ...string[]]);

export const SurveyStatusSchema = z.enum(Object.values(SURVEY_STATUS) as [string, ...string[]]);

export const SurveyQuestionTypeSchema = z.enum(
  Object.values(SURVEY_QUESTION_TYPE) as [string, ...string[]]
);

export const SurveyOptionSchema = z.object({
  id: z.string().min(1).max(50),
  label: z.string().min(1).max(200),
  value: z.string().min(1).max(200),
  order: z.number().int().nonnegative(),
});

export const SurveyQuestionSchema = z.object({
  id: z.string().min(1).max(50),
  type: SurveyQuestionTypeSchema,
  text: z.string().min(1).max(500),
  required: z.boolean(),
  options: z.array(SurveyOptionSchema).max(SURVEY.MAX_OPTIONS_PER_QUESTION).optional(),
  order: z.number().int().nonnegative(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
});

export const SurveySchema = BaseEntitySchema.extend({
  title: z.string().min(1).max(SURVEY.TITLE_MAX_LENGTH),
  description: z.string().max(SURVEY.DESCRIPTION_MAX_LENGTH).optional(),
  type: SurveyTypeSchema,
  status: SurveyStatusSchema,
  questions: z.array(SurveyQuestionSchema).min(1).max(SURVEY.MAX_QUESTIONS),
  isAnonymous: z.boolean(),
  targetAudience: z.array(z.string().max(100)).max(20).optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime().optional(),
  responseCount: z.number().int().nonnegative(),
  createdBy: UuidSchema,
});

export const SurveyAnswerSchema = z.object({
  questionId: z.string().min(1).max(50),
  value: z.union([z.string(), z.number(), z.array(z.string())]),
});

export const SurveyResponseSchema = z.object({
  id: z.string().min(1),
  surveyId: z.string().min(1),
  userId: UuidSchema.optional(),
  answers: z.array(SurveyAnswerSchema).min(1).max(SURVEY.MAX_QUESTIONS),
  submittedAt: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const SurveyPublicSchema = SurveySchema.pick({
  id: true,
  title: true,
  type: true,
  status: true,
  startAt: true,
  endAt: true,
});

export type SurveyTypeSchemaType = z.infer<typeof SurveyTypeSchema>;
export type SurveyStatusSchemaType = z.infer<typeof SurveyStatusSchema>;
export type SurveyQuestionTypeSchemaType = z.infer<typeof SurveyQuestionTypeSchema>;
export type SurveySchemaType = z.infer<typeof SurveySchema>;
export type SurveyResponseSchemaType = z.infer<typeof SurveyResponseSchema>;
export type SurveyPublicSchemaType = z.infer<typeof SurveyPublicSchema>;
