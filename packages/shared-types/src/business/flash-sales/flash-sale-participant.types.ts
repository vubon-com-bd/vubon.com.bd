import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { FLASH_SALE_PARTICIPANT } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-participant.constants';
import { FlashSale } from './flash-sale.types';

export interface FlashSaleParticipant extends BaseEntity {
  participantId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  userId: string;
  user: User;
  status: keyof typeof FLASH_SALE_PARTICIPANT.STATUS | string;
  type: keyof typeof FLASH_SALE_PARTICIPANT.PARTICIPATION_TYPES | string;
  registeredAt: Date;
  confirmedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  purchaseCount: number;
  totalAmount: number;
  metadata: Record<string, unknown>;
}
