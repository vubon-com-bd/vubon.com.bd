import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ABANDONED_CART } from '@vubon/shared-constants/src/business/cart/abandoned-cart.constants';

const abandonedCartStatusKeys = Object.keys(ABANDONED_CART.STATUS) as [string, ...string[]];

export const AbandonedCartSchema = BaseSchema.extend({
  abandonedId: z.string().uuid(),
  cartId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  status: z.enum(abandonedCartStatusKeys),
  abandonedAt: z.date(),
  lastReminderSentAt: z.date().optional(),
  reminderCount: z.number().int().min(0).default(0),
  reminderHistory: z.array(
    z.object({
      sentAt: z.date(),
      type: z.enum(['email', 'sms', 'push']),
      status: z.enum(['sent', 'delivered', 'opened', 'clicked', 'failed']),
      metadata: z.record(z.unknown()),
    })
  ),
  recoveredAt: z.date().optional(),
  recoveryMethod: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
