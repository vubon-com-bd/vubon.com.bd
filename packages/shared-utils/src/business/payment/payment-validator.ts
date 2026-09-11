import { PAYMENT_STATUS } from '@vubon/shared-constants/src/business/payment/payment-status.constants';

export interface PaymentInput {
  orderId: string;
  userId: string;
  status: string;
  amount: number;
  isCompleted: boolean;
  isFailed: boolean;
  isRefunded: boolean;
}

export const validatePayment = (
  payment: Partial<PaymentInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!payment.orderId) errors.push('Order ID is required');
  if (!payment.userId) errors.push('User ID is required');
  if (payment.status && !Object.keys(PAYMENT_STATUS).includes(payment.status)) {
    errors.push('Invalid payment status');
  }
  if (payment.amount !== undefined && payment.amount < 0) {
    errors.push('Amount cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};

export const isPaymentCompleted = (payment: PaymentInput): boolean => {
  return payment.status === 'completed' && payment.isCompleted;
};

export const isPaymentFailed = (payment: PaymentInput): boolean => {
  return payment.status === 'failed' || payment.isFailed;
};

export const isPaymentRefunded = (payment: PaymentInput): boolean => {
  return payment.status === 'refunded' || payment.isRefunded;
};
