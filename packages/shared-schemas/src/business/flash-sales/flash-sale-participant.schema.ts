import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { FLASH_SALE_PARTICIPANT } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-participant.constants';

const participantStatusKeys = Object.keys(FLASH_SALE_PARTICIPANT.STATUS) as [string, ...string[]];
const participationTypeKeys = Object.keys(FLASH_SALE_PARTICIPANT.PARTICIPATION_TYPES) as [
  string,
  ...string[],
];

export const FlashSaleParticipantSchema = BaseSchema.extend({
  participantId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(participantStatusKeys),
  type: z.enum(participationTypeKeys),
  registeredAt: z.date(),
  confirmedAt: z.date().optional(),
  completedAt: z.date().optional(),
  cancelledAt: z.date().optional(),
  purchaseCount: z.number().int().min(0).default(0),
  totalAmount: z.number().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});
