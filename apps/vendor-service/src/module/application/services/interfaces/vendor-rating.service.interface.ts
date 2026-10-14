/**
 * IVendorRatingService — contract
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_RATING_SERVICE = Symbol('VENDOR_RATING_SERVICE');

export interface RatingSummaryDTO {
  readonly vendorId: string;
  readonly overall: number;
  readonly productQuality: number;
  readonly shippingSpeed: number;
  readonly customerService: number;
  readonly communication: number;
  readonly valueForMoney: number;
  readonly packaging: number;
  readonly totalReviews: number;
  readonly recentReviews: number;
  readonly distribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
  readonly positivePercent: number;
  readonly negativePercent: number;
}

export interface RatingRecalculationResultDTO {
  readonly vendorId: string;
  readonly previousOverall: number;
  readonly newOverall: number;
  readonly delta: number;
  readonly totalReviews: number;
}

export interface IVendorRatingService {
  getByVendorId(vendorId: string): Promise<RatingSummaryDTO | null>;
  recalculate(vendorId: string, actorId?: string): Promise<RatingRecalculationResultDTO>;
  getTopRated(limit?: number): Promise<readonly RatingSummaryDTO[]>;
  getBottomRated(limit?: number): Promise<readonly RatingSummaryDTO[]>;
  getDistribution(vendorId: string): Promise<Readonly<Record<1 | 2 | 3 | 4 | 5, number>>>;
}
