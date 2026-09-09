import { BaseEntity } from '../../common/base.types';
import { DEAL_REPORT } from '@vubon/shared-constants/src/business/flash-sales/deal-report.constants';
import { Deal } from './deal.types';
import { DealAnalytics } from './deal-analytics.types';

export interface DealTopProduct {
  productId: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface DealReportSummary {
  totalSales: number;
  totalRevenue: number;
  totalDiscount: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: DealTopProduct[];
}

export interface DealReportInsight {
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export interface DealReport extends BaseEntity {
  reportId: string;
  dealId: string;
  deal: Deal;
  type: keyof typeof DEAL_REPORT.TYPES | string;
  format: keyof typeof DEAL_REPORT.REPORT_FORMATS | string;
  data: DealAnalytics[];
  summary: DealReportSummary;
  insights: DealReportInsight[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}
