import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CHECKOUT_SESSION } from '@vubon/shared-constants/src/business/checkout/checkout-session.constants';

const checkoutSessionStatusKeys = Object.keys(CHECKOUT_SESSION.STATUS) as [string, ...string[]];

export const CheckoutSessionSchema = BaseSchema.extend({
  sessionId: z.string().uuid(),
  checkoutId: z.string().uuid(),
  token: z.string(),
  status: z.enum(checkoutSessionStatusKeys),
  ipAddress: z.string(),
  userAgent: z.string(),
  deviceId: z.string(),
  expiresAt: z.date(),
  lastActivity: z.date(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
