/**
 * SEO Link Types
 * @module shared-types/platform/seo
 */

import type { SEO_LINK_TYPE } from '@vubon/shared-constants/platform';

export type SeoLinkTypeValue = (typeof SEO_LINK_TYPE)[keyof typeof SEO_LINK_TYPE];

export interface SeoLink {
  readonly id: string;
  readonly sourceUrl: string;
  readonly targetUrl: string;
  readonly type: SeoLinkTypeValue;
  readonly anchorText?: string;
  readonly rel?: string;
  readonly status?: number;
  readonly isBroken: boolean;
  readonly lastCheckedAt?: string;
  readonly discoveredAt: string;
}

export interface SeoLinkAnalysis {
  readonly url: string;
  readonly internalLinks: number;
  readonly externalLinks: number;
  readonly brokenLinks: number;
  readonly nofollowLinks: number;
  readonly analyzedAt: string;
}

export interface SeoBacklink {
  readonly sourceUrl: string;
  readonly targetUrl: string;
  readonly anchorText?: string;
  readonly domainAuthority?: number;
  readonly isDofollow: boolean;
  readonly discoveredAt: string;
}
