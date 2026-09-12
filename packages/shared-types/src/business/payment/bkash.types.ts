import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { BKASH } from '@vubon/shared-constants/src/business/payment/bkash.constants';
import { Payment } from './payment.types';

export interface BkashPayment extends BaseEntity {
  bkashId: string;
  paymentId: string;
  payment: Payment;
  transactionId: string;
  type: keyof typeof BKASH.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  merchantInvoiceNumber?: string;
  trxId?: string;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
