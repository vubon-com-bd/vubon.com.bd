/**
 * SEO Robots Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-robots.constants থেকে।
 */

import { z } from 'zod';
import { SEO_ROBOTS_DIRECTIVE, SEO_ROBOTS_USER_AGENT } from '@vubon/shared-constants/platform';

export const SeoRobotsDirectiveSchema = z.enum(
  Object.values(SEO_ROBOTS_DIRECTIVE) as [string, ...string[]]
);

export const SeoRobotsUserAgentSchema = z.enum(
  Object.values(SEO_ROBOTS_USER_AGENT) as [string, ...string[]]
);

export const SeoRobotsSchema = z.object({
  userAgent: z.union([SeoRobotsUserAgentSchema, z.string().min(1).max(100)]),
  allow: z.array(z.string().max(500)).max(100),
  disallow: z.array(z.string().max(500)).max(100),
  crawlDelay: z.number().int().nonnegative().max(60).optional(),
  sitemap: z.string().url().optional(),
});

export const SeoRobotsMetaSchema = z.object({
  directives: z.array(SeoRobotsDirectiveSchema).max(10),
  maxSnippet: z.number().int().nonnegative().optional(),
  maxImagePreview: z.enum(['none', 'standard', 'large']).optional(),
});

export type SeoRobotsDirectiveSchemaType = z.infer<typeof SeoRobotsDirectiveSchema>;
export type SeoRobotsUserAgentSchemaType = z.infer<typeof SeoRobotsUserAgentSchema>;
export type SeoRobotsSchemaType = z.infer<typeof SeoRobotsSchema>;
export type SeoRobotsMetaSchemaType = z.infer<typeof SeoRobotsMetaSchema>;
