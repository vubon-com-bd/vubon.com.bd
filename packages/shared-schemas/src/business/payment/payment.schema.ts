import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { OrderSchema } from '../checkout/order.schema';
import { PaymentMethodSchema } from './payment-method.schema';
import { PaymentVerificationSchema } from './payment-verification.schema';
import { PaymentRefundSchema } from './payment-refund.schema';
import { TransactionSchema } from './transaction.schema';
import { PAYMENT_STATUS } from '@vubon/shared-constants/src/business/payment/payment-status.constants';

const paymentStatusKeys = Object.keys(PAYMENT_STATUS) as [string, ...string[]];

export const PaymentSchema = BaseSchema.extend({
  paymentId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  userId: z.string().uuid(),
  user: UserSchema,
  method: PaymentMethodSchema,
  status: z.enum(paymentStatusKeys),
  amount: MoneySchema,
  currency: z.string().min(3).max(3),
  transactionId: z.string().uuid().optional(),
  transaction: TransactionSchema.optional(),
  verification: PaymentVerificationSchema,
  refunds: z.array(PaymentRefundSchema),
  isCompleted: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isRefunded: z.boolean().default(false),
  isPartialRefunded: z.boolean().default(false),
  initiatedAt: z.date(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  metadata: z.object({
    ipAddress: z.string(),
    userAgent: z.string(),
    deviceId: z.string(),
    sessionId: z.string(),
    gatewayResponse: z.record(z.unknown()).optional(),
    errorMessage: z.string().optional(),
  }),
});

export const PaymentCreateSchema = PaymentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isCompleted: true,
  isFailed: true,
  isRefunded: true,
  isPartialRefunded: true,
  completedAt: true,
  failedAt: true,
});

export const PaymentUpdateSchema = PaymentCreateSchema.partial();
