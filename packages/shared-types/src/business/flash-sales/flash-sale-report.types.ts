import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_REPORT } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-report.constants';
import { FlashSale } from './flash-sale.types';
import { FlashSaleAnalytics } from './flash-sale-analytics.types';

export interface TopProduct {
  productId: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface ReportSummary {
  totalSales: number;
  totalRevenue: number;
  totalParticipants: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: TopProduct[];
}

export interface ReportInsight {
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export interface FlashSaleReport extends BaseEntity {
  reportId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  type: keyof typeof FLASH_SALE_REPORT.TYPES | string;
  format: keyof typeof FLASH_SALE_REPORT.REPORT_FORMATS | string;
  data: FlashSaleAnalytics[];
  summary: ReportSummary;
  insights: ReportInsight[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}
