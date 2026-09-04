/**
 * Vendor Settlement Types
 * ভেন্ডর সেটেলমেন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorSettlement extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  periodStart: Date;
  periodEnd: Date;
  totalSales: number;
  totalOrders: number;
  totalCommission: number;
  totalFee: number;
  totalTax: number;
  netAmount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  payoutId?: string;
  processedAt?: Date;
  completedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorSettlementCreateInput {
  vendorId: string;
  periodStart: Date;
  periodEnd: Date;
  totalSales: number;
  totalOrders: number;
  totalCommission: number;
  totalFee: number;
  totalTax: number;
  netAmount: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSettlementUpdateInput {
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  payoutId?: string;
  processedAt?: Date;
  completedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSettlementResponse {
  vendorSettlement: VendorSettlement;
}
