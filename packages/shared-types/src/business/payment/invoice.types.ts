import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { INVOICE } from '@vubon/shared-constants/src/business/payment/invoice.constants';
import { Order } from '../checkout/order.types';
import { Payment } from './payment.types';

export interface Invoice extends BaseEntity {
  invoiceId: string;
  invoiceNumber: string;
  orderId: string;
  order: Order;
  paymentId?: string;
  payment?: Payment;
  status: keyof typeof INVOICE.STATUS | string;
  type: keyof typeof INVOICE.TYPES | string;
  subtotal: Money;
  taxTotal: Money;
  discountTotal: Money;
  grandTotal: Money;
  currency: string;
  issuedDate: Date;
  dueDate: Date;
  paidDate?: Date;
  notes?: string;
  terms?: string;
  metadata: Record<string, unknown>;
}
