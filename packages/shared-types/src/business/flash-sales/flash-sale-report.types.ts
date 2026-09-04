/**
 * Flash Sale Report Types
 * ফ্ল্যাশ সেল রিপোর্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface FlashSaleReport extends BaseEntity {
  flashSaleId: string;
  name: string;
  nameBangla?: string;
  startDate: Date;
  endDate: Date;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalDiscount: number;
  totalParticipants: number;
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
  topParticipants: {
    userId: string;
    userName: string;
    totalPurchases: number;
    totalSpent: number;
  }[];
  hourlyData: {
    hour: number;
    orders: number;
    revenue: number;
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

export interface FlashSaleReportCreateInput {
  flashSaleId: string;
  name: string;
  nameBangla?: string;
  startDate: Date;
  endDate: Date;
  format?: 'pdf' | 'csv' | 'excel' | 'json';
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleReportResponse {
  flashSaleReport: FlashSaleReport;
}
