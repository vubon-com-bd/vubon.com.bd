/**
 * Cash On Delivery Types
 * ক্যাশ অন ডেলিভারি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface CashOnDelivery extends BaseEntity {
  orderId: string;
  paymentId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  deliveryAddress: string;
  deliveryDate?: Date;
  collectedBy?: string;
  collectedAt?: Date;
  note?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CashOnDeliveryCreateInput {
  orderId: string;
  amount: number;
  currency?: string;
  deliveryAddress: string;
  deliveryDate?: Date;
  note?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface CashOnDeliveryUpdateInput {
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  collectedBy?: string;
  collectedAt?: Date;
  note?: string;
}

export interface CashOnDeliveryResponse {
  cashOnDelivery: CashOnDelivery;
}
