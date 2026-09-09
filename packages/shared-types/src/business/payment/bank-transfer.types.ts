import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { BANK_TRANSFER } from '@vubon/shared-constants/src/business/payment/bank-transfer.constants';
import { Payment } from './payment.types';

export interface BankTransferPayment extends BaseEntity {
  transferId: string;
  paymentId: string;
  payment: Payment;
  type: keyof typeof BANK_TRANSFER.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  routingNumber?: string;
  swiftCode?: string;
  referenceNumber?: string;
  transactionId?: string;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
