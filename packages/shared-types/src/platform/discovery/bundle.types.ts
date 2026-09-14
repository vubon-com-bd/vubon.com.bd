/**
 * Bundle Types
 * @module shared-types/platform/discovery
 */

import type { BUNDLE_TYPE, BUNDLE_STATUS, BUNDLE_PRICING } from '@vubon/shared-constants/platform';
import type { Money } from '../../common/primitives';

export type BundleTypeValue = (typeof BUNDLE_TYPE)[keyof typeof BUNDLE_TYPE];

export type BundleStatusValue = (typeof BUNDLE_STATUS)[keyof typeof BUNDLE_STATUS];

export type BundlePricingValue = (typeof BUNDLE_PRICING)[keyof typeof BUNDLE_PRICING];

export interface DiscoveryBundle {
  readonly id: string;
  readonly name: string;
  readonly type: BundleTypeValue;
  readonly status: BundleStatusValue;
  readonly pricing: BundlePricingValue;
  readonly productIds: readonly string[];
  readonly originalTotal: Money;
  readonly bundlePrice: Money;
  readonly discountPercent: number;
  readonly currency: string;
  readonly isPersonalized: boolean;
  readonly generatedAt: string;
}

export interface BundleGenerationInput {
  readonly sourceProductId?: string;
  readonly userId?: string;
  readonly maxItems?: number;
  readonly minDiscountPercent?: number;
}
