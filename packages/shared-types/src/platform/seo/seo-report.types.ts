import { BaseEntity } from '../../common/base.types';
import { SEO_REPORT } from '@vubon/shared-constants/src/platform/seo/seo-report.constants';
import { SEOAnalytics } from './seo-analytics.types';
import { SEORanking } from './seo-ranking.types';
import { SEOScore } from './seo-score.types';

export interface SEOReportSummary {
  totalKeywords: number;
  totalRankings: number;
  averagePosition: number;
  top3Keywords: number;
  top10Keywords: number;
  top20Keywords: number;
  averageScore: number;
  organicTraffic: number;
  organicConversions: number;
  bounceRate: number;
  pageViews: number;
  backlinkCount: number;
  domainAuthority: number;
}

export interface SEOReportInsight {
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export interface SEOReport extends BaseEntity {
  reportId: string;
  type: keyof typeof SEO_REPORT.TYPES | string;
  format: keyof typeof SEO_REPORT.REPORT_FORMATS | string;
  analytics: SEOAnalytics[];
  rankings: SEORanking[];
  scores: SEOScore[];
  summary: SEOReportSummary;
  insights: SEOReportInsight[];
  recommendations: string[];
  schedule: keyof typeof SEO_REPORT.REPORT_SCHEDULE | string;
  generatedAt: Date;
  metadata: Record<string, unknown>;
}
