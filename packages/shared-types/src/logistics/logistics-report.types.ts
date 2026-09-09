import { BaseEntity } from '../common/base.types';
import { LOGISTICS_REPORT } from '@vubon/shared-constants/src/logistics/logistics-report.constants';
import { Logistics } from './logistics.types';
import { LogisticsAnalytics } from './logistics-analytics.types';

export interface LogisticsReportSummary {
  totalShipments: number;
  totalDeliveries: number;
  onTimeDelivery: number;
  averageDeliveryTime: number;
  totalCost: number;
  courierPerformance: Record<string, number>;
  zonePerformance: Record<string, number>;
}

export interface LogisticsReportInsight {
  type: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
}

export interface LogisticsReport extends BaseEntity {
  reportId: string;
  logisticsId: string;
  logistics: Logistics;
  type: keyof typeof LOGISTICS_REPORT.TYPES | string;
  format: keyof typeof LOGISTICS_REPORT.REPORT_FORMATS | string;
  analytics: LogisticsAnalytics[];
  summary: LogisticsReportSummary;
  insights: LogisticsReportInsight[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}
