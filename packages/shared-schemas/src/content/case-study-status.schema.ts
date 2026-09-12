import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { CASE_STUDY_STATUS } from '@vubon/shared-constants/src/content/case-study-status.constants';

const caseStudyStatusKeys = Object.keys(CASE_STUDY_STATUS) as [string, ...string[]];

export const CaseStudyStatusSchema = StatusSchema.extend({
  status: z.enum(caseStudyStatusKeys),
  category: z.literal('case_study'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const CaseStudyStatusEnumSchema = z.enum(caseStudyStatusKeys);
