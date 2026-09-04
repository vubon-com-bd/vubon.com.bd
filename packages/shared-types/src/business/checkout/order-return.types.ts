/**
 * Order Return Types
 * অর্ডার রিটার্ন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Order } from './order.types';
import { OrderItem } from './order-item.types';

export interface OrderReturn extends BaseEntity {
  orderId: string;
  order: Order;
  userId: string;
  user?: User;
  items: OrderItem[];
  reason: string;
  reasonBangla?: string;
  description?: string;
  descriptionBangla?: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed' | 'cancelled';
  returnMethod: 'refund' | 'replacement' | 'store_credit';
  refundAmount?: number;
  refundMethod?: string;
  replacementOrderId?: string;
  adminNote?: string;
  processedBy?: string;
  processedAt?: Date;
  completedAt?: Date;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderReturnCreateInput {
  orderId: string;
  userId: string;
  items: string[];
  reason: string;
  reasonBangla?: string;
  description?: string;
  descriptionBangla?: string;
  images?: string[];
  returnMethod: 'refund' | 'replacement' | 'store_credit';
}

export interface OrderReturnUpdateInput {
  status?: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed' | 'cancelled';
  refundAmount?: number;
  refundMethod?: string;
  replacementOrderId?: string;
  adminNote?: string;
  processedBy?: string;
  processedAt?: Date;
  completedAt?: Date;
  trackingNumber?: string;
}

export interface OrderReturnResponse {
  orderReturn: OrderReturn;
}
