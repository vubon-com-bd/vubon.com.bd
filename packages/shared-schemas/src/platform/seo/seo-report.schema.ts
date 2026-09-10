import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_REPORT } from '@vubon/shared-constants/src/platform/seo/seo-report.constants';
import { SEOAnalyticsSchema } from './seo-analytics.schema';
import { SEORankingSchema } from './seo-ranking.schema';
import { SEOScoreSchema } from './seo-score.schema';

const reportTypeKeys = Object.keys(SEO_REPORT.TYPES) as [string, ...string[]];
const reportFormatKeys = Object.keys(SEO_REPORT.REPORT_FORMATS) as [string, ...string[]];
const reportScheduleKeys = Object.keys(SEO_REPORT.REPORT_SCHEDULE) as [string, ...string[]];

export const SEOReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  type: z.enum(reportTypeKeys),
  format: z.enum(reportFormatKeys),
  analytics: z.array(SEOAnalyticsSchema),
  rankings: z.array(SEORankingSchema),
  scores: z.array(SEOScoreSchema),
  summary: z.object({
    totalKeywords: z.number().int().min(0),
    totalRankings: z.number().int().min(0),
    averagePosition: z.number().min(0),
    top3Keywords: z.number().int().min(0),
    top10Keywords: z.number().int().min(0),
    top20Keywords: z.number().int().min(0),
    averageScore: z.number().min(0).max(100),
    organicTraffic: z.number().int().min(0),
    organicConversions: z.number().int().min(0),
    bounceRate: z.number().min(0).max(100),
    pageViews: z.number().int().min(0),
    backlinkCount: z.number().int().min(0),
    domainAuthority: z.number().min(0).max(100),
  }),
  insights: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
      description: z.string(),
      severity: z.enum(['info', 'warning', 'success', 'error']),
    })
  ),
  recommendations: z.array(z.string()),
  schedule: z.enum(reportScheduleKeys),
  generatedAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
