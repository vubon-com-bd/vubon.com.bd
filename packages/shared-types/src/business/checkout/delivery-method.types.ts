/**
 * Delivery Method Types
 * ডেলিভারি মেথড সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { DELIVERY_STATUS } from '@vubon/shared-constants';

export interface DeliveryMethod extends BaseEntity {
  checkoutId: string;
  name: string;
  nameBangla?: string;
  type: 'standard' | 'express' | 'same_day' | 'next_day' | 'scheduled' | 'pickup';
  carrier: string;
  carrierCode?: string;
  cost: number;
  estimatedDays: number;
  estimatedDeliveryDate?: Date;
  trackingUrl?: string;
  status: (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryMethodCreateInput {
  checkoutId: string;
  name: string;
  nameBangla?: string;
  type: 'standard' | 'express' | 'same_day' | 'next_day' | 'scheduled' | 'pickup';
  carrier: string;
  carrierCode?: string;
  cost: number;
  estimatedDays: number;
}

export interface DeliveryMethodUpdateInput {
  status?: (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];
  estimatedDeliveryDate?: Date;
  trackingUrl?: string;
}

export interface DeliveryMethodResponse {
  deliveryMethod: DeliveryMethod;
}
