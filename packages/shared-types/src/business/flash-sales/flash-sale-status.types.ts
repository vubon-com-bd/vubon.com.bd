/**
 * Flash Sale Status Value Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-status.constants থেকে।
 */

import type { FLASH_SALE_STATUS } from '@vubon/shared-constants/business';

export type FlashSaleStatusValue = (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];

export interface FlashSaleStatusMetadata {
  readonly value: FlashSaleStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
