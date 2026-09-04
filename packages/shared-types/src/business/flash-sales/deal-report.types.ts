/**
 * Deal Report Types
 * ডিল রিপোর্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface DealReport extends BaseEntity {
  dealId: string;
  name: string;
  nameBangla?: string;
  startDate: Date;
  endDate: Date;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalDiscount: number;
  totalSavings: number;
  averageDiscount: number;
  conversionRate: number;
  sellThroughRate: number;
  topProducts: {
    productId: string;
    productName: string;
    quantitySold: number;
    revenue: number;
    discount: number;
  }[];
  dailyData: {
    date: Date;
    orders: number;
    revenue: number;
  }[];
  generatedAt: Date;
  format: 'pdf' | 'csv' | 'excel' | 'json';
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface DealReportCreateInput {
  dealId: string;
  name: string;
  nameBangla?: string;
  startDate: Date;
  endDate: Date;
  format?: 'pdf' | 'csv' | 'excel' | 'json';
  metadata?: Record<string, string | number | boolean>;
}

export interface DealReportResponse {
  dealReport: DealReport;
}
