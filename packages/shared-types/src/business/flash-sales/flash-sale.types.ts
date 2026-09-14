/**
 * Flash Sale Core Types
 * @module shared-types/business/flash-sales
 *
 * Flash Sale entity + aggregator।
 */

import type { Money } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { FlashSaleStatusValue } from './flash-sale-status.types';
import type { FlashSaleTypeValue } from './flash-sale-type.types';
import type { FlashSaleSchedule, FlashSaleRecurrenceValue } from './flash-sale-schedule.types';
import type { FlashSalePricePublic } from './flash-sale-price.types';
import type { ProductDealPublic } from './product-deal.types';
import type { BundleDealPublic } from './bundle-deal.types';

export interface FlashSale extends BaseEntity<string> {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: FlashSaleTypeValue;
  readonly status: FlashSaleStatusValue;
  readonly schedule: FlashSaleSchedule;
  readonly bannerUrl?: string;
  readonly thumbnailUrl?: string;
  readonly theme?: string;
  readonly maxProducts: number;
  readonly maxParticipants: number;
  readonly minDiscountPercent: number;
  readonly maxDiscountPercent: number;
  readonly products: readonly ProductDealPublic[];
  readonly bundles: readonly BundleDealPublic[];
  readonly prices: readonly FlashSalePricePublic[];
  readonly participantCount: number;
  readonly productCount: number;
  readonly isFeatured: boolean;
  readonly createdBy: string;
}

export interface FlashSalePublic {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: FlashSaleTypeValue;
  readonly status: FlashSaleStatusValue;
  readonly startAt: string;
  readonly endAt: string;
  readonly bannerUrl?: string;
  readonly thumbnailUrl?: string;
  readonly theme?: string;
  readonly productCount: number;
  readonly isFeatured: boolean;
}

export interface FlashSaleSummary {
  readonly id: string;
  readonly name: string;
  readonly status: FlashSaleStatusValue;
  readonly startAt: string;
  readonly endAt: string;
  readonly productCount: number;
  readonly remainingSeconds: number;
}

export interface FlashSaleCreateInput {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: FlashSaleTypeValue;
  readonly schedule: {
    readonly startAt: string;
    readonly endAt: string;
    readonly timezone: string;
    readonly recurrence: FlashSaleRecurrenceValue;
  };
  readonly bannerUrl?: string;
  readonly thumbnailUrl?: string;
  readonly theme?: string;
  readonly minDiscountPercent?: number;
  readonly maxDiscountPercent?: number;
}

export interface FlashSaleUpdateInput {
  readonly name?: string;
  readonly description?: string;
  readonly bannerUrl?: string;
  readonly thumbnailUrl?: string;
  readonly theme?: string;
  readonly isFeatured?: boolean;
}

export interface FlashSaleFilter {
  readonly status?: FlashSaleStatusValue;
  readonly type?: FlashSaleTypeValue;
  readonly isFeatured?: boolean;
  readonly activeNow?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface FlashSaleStats {
  readonly flashSaleId: string;
  readonly totalProducts: number;
  readonly totalSold: number;
  readonly totalRevenue: Money;
  readonly currency: string;
  readonly averageDiscountPercent: number;
  readonly participantCount: number;
}
