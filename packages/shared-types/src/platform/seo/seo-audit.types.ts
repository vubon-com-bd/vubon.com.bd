import { BaseEntity } from '../../common/base.types';
import { SEO_AUDIT } from '@vubon/shared-constants/src/platform/seo/seo-audit.constants';
import { SEO } from './seo.types';
import { SEOScore } from './seo-score.types';

export interface AuditIssue {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendation: string;
  isFixed: boolean;
}

export interface AuditRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export interface SEOAudit extends BaseEntity {
  auditId: string;
  seoId: string;
  seo: SEO;
  status: keyof typeof SEO_AUDIT.STATUS | string;
  type: keyof typeof SEO_AUDIT.TYPES | string;
  category: keyof typeof SEO_AUDIT.AUDIT_CATEGORIES | string;
  score: SEOScore;
  issues: AuditIssue[];
  recommendations: AuditRecommendation[];
  frequency: keyof typeof SEO_AUDIT.AUDIT_FREQUENCIES | string;
  startedAt: Date;
  completedAt?: Date;
  metadata: Record<string, unknown>;
}
