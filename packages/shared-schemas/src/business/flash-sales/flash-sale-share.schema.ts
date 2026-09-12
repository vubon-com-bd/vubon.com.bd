import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { FLASH_SALE_SHARE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-share.constants';

const shareTypeKeys = Object.keys(FLASH_SALE_SHARE.TYPES) as [string, ...string[]];
const socialMediaKeys = Object.keys(FLASH_SALE_SHARE.SOCIAL_MEDIA) as [string, ...string[]];

export const FlashSaleShareSchema = BaseSchema.extend({
  shareId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(shareTypeKeys),
  platform: z.enum(socialMediaKeys),
  url: z.string().url(),
  shareAt: z.date(),
  clicks: z.number().int().min(0).default(0),
  shares: z.number().int().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});
