/**
 * SEO Robots Types
 * @module shared-types/platform/seo
 */

import type { SEO_ROBOTS_DIRECTIVE, SEO_ROBOTS_USER_AGENT } from '@vubon/shared-constants/platform';

export type SeoRobotsDirectiveValue =
  (typeof SEO_ROBOTS_DIRECTIVE)[keyof typeof SEO_ROBOTS_DIRECTIVE];

export type SeoRobotsUserAgentValue =
  (typeof SEO_ROBOTS_USER_AGENT)[keyof typeof SEO_ROBOTS_USER_AGENT];

export interface SeoRobots {
  readonly userAgent: SeoRobotsUserAgentValue | string;
  readonly allow: readonly string[];
  readonly disallow: readonly string[];
  readonly crawlDelay?: number;
  readonly sitemap?: string;
}

export interface SeoRobotsMeta {
  readonly directives: readonly SeoRobotsDirectiveValue[];
  readonly maxSnippet?: number;
  readonly maxImagePreview?: 'none' | 'standard' | 'large';
}
