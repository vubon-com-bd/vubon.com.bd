/**
 * Flash Sale Participant Types
 * ফ্ল্যাশ সেল অংশগ্রহণকারী সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { PARTICIPANT } from '@vubon/shared-constants';

export interface FlashSaleParticipant extends BaseEntity {
  flashSaleId: string;
  userId: string;
  user: User;
  status: (typeof PARTICIPANT.STATUS)[keyof typeof PARTICIPANT.STATUS];
  type: (typeof PARTICIPANT.TYPES)[keyof typeof PARTICIPANT.TYPES];
  role: (typeof PARTICIPANT.ROLES)[keyof typeof PARTICIPANT.ROLES];
  joinedAt: Date;
  lastActiveAt?: Date;
  totalPurchases: number;
  totalSpent: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleParticipantCreateInput {
  flashSaleId: string;
  userId: string;
  type?: (typeof PARTICIPANT.TYPES)[keyof typeof PARTICIPANT.TYPES];
  role?: (typeof PARTICIPANT.ROLES)[keyof typeof PARTICIPANT.ROLES];
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleParticipantUpdateInput {
  status?: (typeof PARTICIPANT.STATUS)[keyof typeof PARTICIPANT.STATUS];
  lastActiveAt?: Date;
  totalPurchases?: number;
  totalSpent?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleParticipantResponse {
  flashSaleParticipant: FlashSaleParticipant;
}

export interface FlashSaleParticipantStats {
  totalParticipants: number;
  activeParticipants: number;
  vipParticipants: number;
  premiumParticipants: number;
  guestParticipants: number;
}
