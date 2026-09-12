import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_VERIFICATION } from '@vubon/shared-constants/src/business/payment/payment-verification.constants';

const paymentVerificationStatusKeys = Object.keys(PAYMENT_VERIFICATION.STATUS) as [
  string,
  ...string[],
];

export const PaymentVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  paymentId: z.string().uuid(),
  status: z.enum(paymentVerificationStatusKeys),
  method: z.string(),
  signature: z.string(),
  checks: z.array(
    z.object({
      name: z.string(),
      status: z.enum(['passed', 'failed', 'pending']),
      message: z.string().optional(),
      data: z.unknown().optional(),
    })
  ),
  isVerified: z.boolean().default(false),
  verifiedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
