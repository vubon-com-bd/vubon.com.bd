/**
 * Currency Types
 * @module shared-types/common/primitives
 *
 * Values আসে shared-constants/common/currency.constants থেকে।
 */

import type { CURRENCY } from '@vubon/shared-constants/common';

export type CurrencyCode = (typeof CURRENCY)[keyof typeof CURRENCY];

export interface CurrencyAmount {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

export interface ExchangeRate {
  readonly from: CurrencyCode;
  readonly to: CurrencyCode;
  readonly rate: number;
  readonly updatedAt: string;
}
