/**
 * Upselling Types
 * @module shared-types/platform/discovery
 */

import type { UPSELL_TYPE } from '@vubon/shared-constants/platform';

export type UpsellTypeValue = (typeof UPSELL_TYPE)[keyof typeof UPSELL_TYPE];

export interface UpsellItem {
  readonly productId: string;
  readonly type: UpsellTypeValue;
  readonly priceIncrease: number;
  readonly priceIncreasePercent: number;
  readonly reason: string;
}

export interface UpsellResult {
  readonly sourceProductId: string;
  readonly items: readonly UpsellItem[];
  readonly generatedAt: string;
}
