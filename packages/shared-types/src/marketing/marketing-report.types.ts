import { BaseEntity } from '../common/base.types';
import { MARKETING_REPORT } from '@vubon/shared-constants/src/marketing/marketing-report.constants';
import { BusinessMarketingAnalytics } from './marketing-analytics.types';

export interface MarketingReportSummary {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRevenue: number;
  totalCost: number;
  totalRoi: number;
  topChannels: Record<string, number>;
  topCampaigns: Record<string, number>;
}

export interface MarketingReportInsight {
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export interface MarketingReport extends BaseEntity {
  reportId: string;
  type: keyof typeof MARKETING_REPORT.TYPES | string;
  format: keyof typeof MARKETING_REPORT.REPORT_FORMATS | string;
  analytics: BusinessMarketingAnalytics[];
  summary: MarketingReportSummary;
  insights: MarketingReportInsight[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}
