/**
 * SEO Link Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-link.constants থেকে।
 */

import { z } from 'zod';
import { SEO_LINK_TYPE } from '@vubon/shared-constants/platform';

export const SeoLinkTypeSchema = z.enum(Object.values(SEO_LINK_TYPE) as [string, ...string[]]);

export const SeoLinkSchema = z.object({
  id: z.string().min(1),
  sourceUrl: z.string().url(),
  targetUrl: z.string().url(),
  type: SeoLinkTypeSchema,
  anchorText: z.string().max(200).optional(),
  rel: z.string().max(100).optional(),
  status: z.number().int().min(100).max(599).optional(),
  isBroken: z.boolean(),
  lastCheckedAt: z.string().datetime().optional(),
  discoveredAt: z.string().datetime(),
});

export const SeoLinkAnalysisSchema = z.object({
  url: z.string().url(),
  internalLinks: z.number().int().nonnegative(),
  externalLinks: z.number().int().nonnegative(),
  brokenLinks: z.number().int().nonnegative(),
  nofollowLinks: z.number().int().nonnegative(),
  analyzedAt: z.string().datetime(),
});

export const SeoBacklinkSchema = z.object({
  sourceUrl: z.string().url(),
  targetUrl: z.string().url(),
  anchorText: z.string().max(200).optional(),
  domainAuthority: z.number().min(0).max(100).optional(),
  isDofollow: z.boolean(),
  discoveredAt: z.string().datetime(),
});

export type SeoLinkTypeSchemaType = z.infer<typeof SeoLinkTypeSchema>;
export type SeoLinkSchemaType = z.infer<typeof SeoLinkSchema>;
export type SeoLinkAnalysisSchemaType = z.infer<typeof SeoLinkAnalysisSchema>;
export type SeoBacklinkSchemaType = z.infer<typeof SeoBacklinkSchema>;
