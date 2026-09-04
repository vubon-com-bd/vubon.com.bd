/**
 * Order Tracking Types
 * অর্ডার ট্র্যাকিং সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface OrderTracking extends BaseEntity {
  orderId: string;
  status: string;
  description: string;
  descriptionBangla?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  note?: string;
  createdAt: Date;
}

export interface OrderTrackingCreateInput {
  orderId: string;
  status: string;
  description: string;
  descriptionBangla?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  note?: string;
}

export interface OrderTrackingResponse {
  orderTracking: OrderTracking;
}

export interface OrderTrackingList {
  items: OrderTracking[];
  total: number;
}

export interface OrderTrackingUpdate {
  status: string;
  description: string;
  location?: string;
  note?: string;
}
