/**
 * SEO Audit Types
 * @module shared-types/platform/seo
 */

import type { SEO_AUDIT_TYPE, SEO_AUDIT_STATUS } from '@vubon/shared-constants/platform';

export type SeoAuditTypeValue = (typeof SEO_AUDIT_TYPE)[keyof typeof SEO_AUDIT_TYPE];

export type SeoAuditStatusValue = (typeof SEO_AUDIT_STATUS)[keyof typeof SEO_AUDIT_STATUS];

export interface SeoAudit {
  readonly id: string;
  readonly url?: string;
  readonly type: SeoAuditTypeValue;
  readonly status: SeoAuditStatusValue;
  readonly score?: number;
  readonly totalPages: number;
  readonly issues: readonly SeoAuditIssue[];
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly durationMs?: number;
  readonly triggeredBy?: string;
  readonly createdAt: string;
}

export interface SeoAuditIssue {
  readonly id: string;
  readonly category: string;
  readonly severity: 'critical' | 'high' | 'medium' | 'low';
  readonly message: string;
  readonly url?: string;
  readonly details?: Readonly<Record<string, unknown>>;
}

export interface SeoAuditRequest {
  readonly url?: string;
  readonly type: SeoAuditTypeValue;
  readonly maxPages?: number;
}
