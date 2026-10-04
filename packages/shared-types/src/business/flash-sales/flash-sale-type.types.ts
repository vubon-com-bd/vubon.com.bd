/**
 * Flash Sale Type Value Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-type.constants থেকে।
 */

import type { FLASH_SALE_TYPE } from '@vubon/shared-constants/business';

export type FlashSaleTypeValue = (typeof FLASH_SALE_TYPE)[keyof typeof FLASH_SALE_TYPE];

export interface FlashSaleTypeMetadata {
  readonly value: FlashSaleTypeValue;
  readonly label: string;
  readonly defaultDurationHours: number;
  readonly isRecurring: boolean;
}
