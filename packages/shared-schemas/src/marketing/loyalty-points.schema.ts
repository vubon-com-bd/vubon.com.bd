import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { LOYALTY_POINTS } from '@vubon/shared-constants/src/marketing/loyalty-points.constants';

const loyaltyPointsTypeKeys = Object.keys(LOYALTY_POINTS.TYPES) as [string, ...string[]];

export const LoyaltyPointsSchema = BaseSchema.extend({
  pointsId: z.string().uuid(),
  loyaltyId: z.string().uuid(),
  type: z.enum(loyaltyPointsTypeKeys),
  amount: z.number().int().min(0),
  multiplier: z.number().min(0).default(1),
  totalPoints: z.number().int().min(0),
  minRedemption: z.number().int().min(0),
  maxPerTransaction: z.number().int().min(0),
  isActive: z.boolean().default(true),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
