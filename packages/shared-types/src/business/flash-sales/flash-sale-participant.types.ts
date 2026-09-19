/**
 * Flash Sale Participant Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-participant.constants থেকে।
 */

import type {
  FLASH_SALE_PARTICIPANT_TYPE,
  FLASH_SALE_PARTICIPANT_STATUS,
} from '@vubon/shared-constants/business';
import type { VendorId, ProductId, CategoryId, BrandId } from '../../common/primitives';

export type ParticipantTypeValue =
  (typeof FLASH_SALE_PARTICIPANT_TYPE)[keyof typeof FLASH_SALE_PARTICIPANT_TYPE];

export type ParticipantStatusValue =
  (typeof FLASH_SALE_PARTICIPANT_STATUS)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS];

export interface FlashSaleParticipant {
  readonly id: string;
  readonly flashSaleId: string;
  readonly type: ParticipantTypeValue;
  readonly status: ParticipantStatusValue;
  readonly vendorId?: VendorId;
  readonly productId?: ProductId;
  readonly variantId?: string;
  readonly categoryId?: CategoryId;
  readonly brandId?: BrandId;
  readonly invitedAt: string;
  readonly respondedAt?: string;
  readonly approvedBy?: string;
  readonly rejectedReason?: string;
  readonly notes?: string;
}

export interface ParticipantInviteInput {
  readonly flashSaleId: string;
  readonly vendorId: VendorId;
  readonly productIds?: readonly ProductId[];
  readonly notes?: string;
}

export interface ParticipantResponseInput {
  readonly participantId: string;
  readonly status: ParticipantStatusValue;
  readonly reason?: string;
}
