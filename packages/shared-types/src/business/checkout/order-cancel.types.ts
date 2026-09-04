/**
 * Order Cancel Types
 * অর্ডার বাতিল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Order } from './order.types';

export interface OrderCancel extends BaseEntity {
  orderId: string;
  order: Order;
  userId: string;
  user?: User;
  reason: string;
  reasonBangla?: string;
  description?: string;
  descriptionBangla?: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed';
  cancellationFee?: number;
  refundAmount?: number;
  refundMethod?: string;
  adminNote?: string;
  processedBy?: string;
  processedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCancelCreateInput {
  orderId: string;
  userId: string;
  reason: string;
  reasonBangla?: string;
  description?: string;
  descriptionBangla?: string;
}

export interface OrderCancelUpdateInput {
  status?: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed';
  cancellationFee?: number;
  refundAmount?: number;
  refundMethod?: string;
  adminNote?: string;
  processedBy?: string;
  processedAt?: Date;
  completedAt?: Date;
}

export interface OrderCancelResponse {
  orderCancel: OrderCancel;
}
