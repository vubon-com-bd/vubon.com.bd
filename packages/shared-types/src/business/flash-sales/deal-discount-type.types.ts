/**
 * Deal Discount Type Value Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/deal-discount-type.constants থেকে।
 */

import type { DEAL_DISCOUNT_TYPE } from '@vubon/shared-constants/business';

export type DealDiscountTypeValue = (typeof DEAL_DISCOUNT_TYPE)[keyof typeof DEAL_DISCOUNT_TYPE];

export interface DealDiscountTypeMetadata {
  readonly value: DealDiscountTypeValue;
  readonly label: string;
  readonly isPercentage: boolean;
  readonly isFixed: boolean;
}
