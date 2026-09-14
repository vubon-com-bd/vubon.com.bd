/**
 * Bundle Deal Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/bundle-deal.constants থেকে।
 */

import type { BUNDLE_DEAL_STATUS, BUNDLE_DEAL_TYPE } from '@vubon/shared-constants/business';
import type { ProductId, Money } from '../../common/primitives';

export type BundleDealStatusValue = (typeof BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL_STATUS];

export type BundleDealTypeValue = (typeof BUNDLE_DEAL_TYPE)[keyof typeof BUNDLE_DEAL_TYPE];

export interface BundleDeal {
  readonly id: string;
  readonly dealId: string;
  readonly name: string;
  readonly status: BundleDealStatusValue;
  readonly type: BundleDealTypeValue;
  readonly productIds: readonly ProductId[];
  readonly itemCount: number;
  readonly originalTotal: Money;
  readonly bundlePrice: Money;
  readonly discountAmount: Money;
  readonly discountPercent: number;
  readonly currency: string;
  readonly minItems: number;
  readonly maxItems: number;
  readonly perUserLimit: number;
  readonly startAt: string;
  readonly endAt: string;
}

export interface BundleDealPublic {
  readonly id: string;
  readonly name: string;
  readonly type: BundleDealTypeValue;
  readonly itemCount: number;
  readonly bundlePrice: Money;
  readonly discountPercent: number;
  readonly currency: string;
}
