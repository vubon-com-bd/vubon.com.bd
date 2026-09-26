/**
 * Promotion Core Types
 * @module shared-types/marketing
 */

import type { BaseEntity } from '../common/base';
import type { UserId, Money } from '../common/primitives';
import type { PromotionTypeValue, PromotionAppliesToValue } from './promotion-type.types';
import type { PromotionStatusValue } from './promotion-status.types';
import type { PromotionDiscountTypeValue } from './promotion-discount-type.types';

export interface Promotion extends BaseEntity<string> {
  readonly name: string;
  readonly description?: string;
  readonly type: PromotionTypeValue;
  readonly status: PromotionStatusValue;
  readonly discountType: PromotionDiscountTypeValue;
  readonly appliesTo: PromotionAppliesToValue;
  readonly discountValue: number;
  readonly maxDiscountAmount?: Money;
  readonly minOrderAmount?: Money;
  readonly maxUses: number;
  readonly usedCount: number;
  readonly maxUsesPerUser: number;
  readonly applicableIds?: readonly string[];
  readonly excludedIds?: readonly string[];
  readonly startAt: string;
  readonly endAt: string;
  readonly isStackable: boolean;
  readonly isActive: boolean;
  readonly createdBy: UserId;
}

export interface PromotionPublic {
  readonly id: string;
  readonly name: string;
  readonly type: PromotionTypeValue;
  readonly discountType: PromotionDiscountTypeValue;
  readonly appliesTo: PromotionAppliesToValue;
  readonly discountValue: number;
  readonly startAt: string;
  readonly endAt: string;
}

export interface PromotionListFilter {
  readonly type?: PromotionTypeValue;
  readonly status?: PromotionStatusValue;
  readonly appliesTo?: PromotionAppliesToValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
