/**
 * Nagad Types
 * Nagad সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { NAGAD } from '@vubon/shared-constants';

export interface NagadPayment extends BaseEntity {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: (typeof NAGAD.STATUS)[keyof typeof NAGAD.STATUS];
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

export interface NagadCreateInput {
  paymentId: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface NagadUpdateInput {
  status?: (typeof NAGAD.STATUS)[keyof typeof NAGAD.STATUS];
  transactionId?: string;
  paidAt?: Date;
  failedAt?: Date;
}

export interface NagadResponse {
  nagadPayment: NagadPayment;
}
