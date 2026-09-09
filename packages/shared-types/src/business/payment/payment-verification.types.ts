import { BaseEntity } from '../../common/base.types';
import { PAYMENT_VERIFICATION } from '@vubon/shared-constants/src/business/payment/payment-verification.constants';
import { Payment } from './payment.types';

export interface VerificationCheck {
  name: string;
  status: 'passed' | 'failed' | 'pending';
  message?: string;
  data?: unknown;
}

export interface PaymentVerification extends BaseEntity {
  verificationId: string;
  paymentId: string;
  payment: Payment;
  status: keyof typeof PAYMENT_VERIFICATION.STATUS | string;
  method: string;
  signature: string;
  checks: VerificationCheck[];
  isVerified: boolean;
  verifiedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
