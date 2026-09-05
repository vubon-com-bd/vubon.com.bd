/**
 * Flash Sale Participant Schema
 * ফ্ল্যাশ সেল অংশগ্রহণকারী সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PARTICIPANT } from '@vubon/shared-constants';

export const FlashSaleParticipantSchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.enum([
    PARTICIPANT.STATUS.ACTIVE,
    PARTICIPANT.STATUS.INACTIVE,
    PARTICIPANT.STATUS.REGISTERED,
    PARTICIPANT.STATUS.QUALIFIED,
    PARTICIPANT.STATUS.DISQUALIFIED,
    PARTICIPANT.STATUS.CANCELLED,
    PARTICIPANT.STATUS.DELETED,
  ]),
  type: z.enum([PARTICIPANT.TYPES.BUYER, PARTICIPANT.TYPES.SELLER, PARTICIPANT.TYPES.BOTH]),
  role: z.enum([
    PARTICIPANT.ROLES.REGULAR,
    PARTICIPANT.ROLES.VIP,
    PARTICIPANT.ROLES.PREMIUM,
    PARTICIPANT.ROLES.GUEST,
  ]),
  joinedAt: z.date(),
  lastActiveAt: z.date().optional(),
  totalPurchases: z.number().int().min(0).default(0),
  totalSpent: z.number().min(0).default(0),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const FlashSaleParticipantCreateSchema = FlashSaleParticipantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  totalPurchases: true,
  totalSpent: true,
});

export const FlashSaleParticipantUpdateSchema = FlashSaleParticipantCreateSchema.partial();

export type FlashSaleParticipant = z.infer<typeof FlashSaleParticipantSchema>;
export type FlashSaleParticipantCreate = z.infer<typeof FlashSaleParticipantCreateSchema>;
export type FlashSaleParticipantUpdate = z.infer<typeof FlashSaleParticipantUpdateSchema>;
