/**
 * Cross-Selling Types
 * @module shared-types/platform/discovery
 */

import type { CROSS_SELL_TYPE, CROSS_SELL_LOCATION } from '@vubon/shared-constants/platform';

export type CrossSellTypeValue = (typeof CROSS_SELL_TYPE)[keyof typeof CROSS_SELL_TYPE];

export type CrossSellLocationValue = (typeof CROSS_SELL_LOCATION)[keyof typeof CROSS_SELL_LOCATION];

export interface CrossSellItem {
  readonly productId: string;
  readonly type: CrossSellTypeValue;
  readonly affinity: number;
  readonly reason?: string;
}

export interface CrossSellResult {
  readonly sourceProductId: string;
  readonly location?: CrossSellLocationValue;
  readonly items: readonly CrossSellItem[];
  readonly generatedAt: string;
}
