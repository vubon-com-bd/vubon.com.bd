import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { CASE_STUDY_STATUS } from '@vubon/shared-constants/src/content/case-study-status.constants';
import { CASE_STUDY } from '@vubon/shared-constants/src/content/case-study.constants';

const caseStudyStatusKeys = Object.keys(CASE_STUDY_STATUS) as [string, ...string[]];
const caseStudyTypeKeys = Object.keys(CASE_STUDY.CASE_STUDY_TYPES) as [string, ...string[]];

export const CaseStudySchema = BaseSchema.extend({
  caseStudyId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(10).max(10000),
  status: z.enum(caseStudyStatusKeys),
  type: z.enum(caseStudyTypeKeys),
  authorId: z.string().uuid(),
  author: UserSchema,
  featuredImage: z.string().url().optional(),
  clientName: z.string().optional(),
  clientLogo: z.string().url().optional(),
  results: z.array(z.string()),
  metrics: z.object({
    revenueIncrease: z.number().optional(),
    costReduction: z.number().optional(),
    efficiencyGain: z.number().optional(),
    customerSatisfaction: z.number().optional(),
    otherMetrics: z.record(z.number()).optional(),
  }),
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      industry: z.string().optional(),
      region: z.string().optional(),
    })
    .optional(),
});
