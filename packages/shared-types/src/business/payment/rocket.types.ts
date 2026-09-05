/**
 * Rocket Types
 * Rocket সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { ROCKET } from '@vubon/shared-constants';

export interface RocketPayment extends BaseEntity {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: (typeof ROCKET.STATUS)[keyof typeof ROCKET.STATUS];
  apiKey: string;
  secret: string;
  merchantId: string;
  sandbox: boolean;
  metadata?: Record<string, string | number | boolean>;
  paidAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RocketCreateInput {
  paymentId: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface RocketUpdateInput {
  status?: (typeof ROCKET.STATUS)[keyof typeof ROCKET.STATUS];
  transactionId?: string;
  paidAt?: Date;
  failedAt?: Date;
}

export interface RocketResponse {
  rocketPayment: RocketPayment;
}
