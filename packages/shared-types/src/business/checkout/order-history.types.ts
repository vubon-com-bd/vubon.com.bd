/**
 * Order History Types
 * অর্ডার ইতিহাস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Order } from './order.types';

export interface OrderHistory extends BaseEntity {
  orderId: string;
  order: Order;
  userId: string;
  user?: User;
  status: string;
  oldStatus?: string;
  newStatus?: string;
  action: string;
  note?: string;
  performedBy: string;
  metadata?: Record<string, string | number | boolean | object>;
  createdAt: Date;
}

export interface OrderHistoryCreateInput {
  orderId: string;
  userId: string;
  status: string;
  oldStatus?: string;
  newStatus?: string;
  action: string;
  note?: string;
  performedBy: string;
  metadata?: Record<string, string | number | boolean | object>;
}

export interface OrderHistoryResponse {
  orderHistory: OrderHistory;
}

export interface OrderHistoryList {
  items: OrderHistory[];
  total: number;
}
