import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_AUDIT } from '@vubon/shared-constants/src/platform/seo/seo-audit.constants';
import { SEOScoreSchema } from './seo-score.schema';

const auditStatusKeys = Object.keys(SEO_AUDIT.STATUS) as [string, ...string[]];
const auditTypeKeys = Object.keys(SEO_AUDIT.TYPES) as [string, ...string[]];
const auditCategoryKeys = Object.keys(SEO_AUDIT.AUDIT_CATEGORIES) as [string, ...string[]];
const auditFrequencyKeys = Object.keys(SEO_AUDIT.AUDIT_FREQUENCIES) as [string, ...string[]];

export const SEOAuditSchema = BaseSchema.extend({
  auditId: z.string().uuid(),
  seoId: z.string().uuid(),
  status: z.enum(auditStatusKeys),
  type: z.enum(auditTypeKeys),
  category: z.enum(auditCategoryKeys),
  score: SEOScoreSchema,
  issues: z.array(
    z.object({
      id: z.string().uuid(),
      severity: z.enum(['critical', 'high', 'medium', 'low']),
      title: z.string(),
      description: z.string(),
      recommendation: z.string(),
      isFixed: z.boolean().default(false),
    })
  ),
  recommendations: z.array(
    z.object({
      id: z.string().uuid(),
      priority: z.enum(['high', 'medium', 'low']),
      title: z.string(),
      description: z.string(),
      effort: z.enum(['low', 'medium', 'high']),
      impact: z.enum(['low', 'medium', 'high']),
    })
  ),
  frequency: z.enum(auditFrequencyKeys),
  startedAt: z.date(),
  completedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
