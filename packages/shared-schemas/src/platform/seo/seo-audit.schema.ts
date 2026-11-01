/**
 * SEO Audit Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-audit.constants থেকে।
 */

import { z } from 'zod';
import { SEO_AUDIT_TYPE, SEO_AUDIT_STATUS } from '@vubon/shared-constants/platform';

export const SeoAuditTypeSchema = z.enum(Object.values(SEO_AUDIT_TYPE) as [string, ...string[]]);

export const SeoAuditStatusSchema = z.enum(
  Object.values(SEO_AUDIT_STATUS) as [string, ...string[]]
);

export const SeoAuditIssueSchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1).max(100),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  message: z.string().min(1).max(1000),
  url: z.string().url().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export const SeoAuditSchema = z.object({
  id: z.string().min(1),
  url: z.string().url().optional(),
  type: SeoAuditTypeSchema,
  status: SeoAuditStatusSchema,
  score: z.number().min(0).max(100).optional(),
  totalPages: z.number().int().nonnegative(),
  issues: z.array(SeoAuditIssueSchema).max(1000),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  durationMs: z.number().int().nonnegative().optional(),
  triggeredBy: z.string().optional(),
  createdAt: z.string().datetime(),
});

export type SeoAuditTypeSchemaType = z.infer<typeof SeoAuditTypeSchema>;
export type SeoAuditStatusSchemaType = z.infer<typeof SeoAuditStatusSchema>;
export type SeoAuditSchemaType = z.infer<typeof SeoAuditSchema>;
