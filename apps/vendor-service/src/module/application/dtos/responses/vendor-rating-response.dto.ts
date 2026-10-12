/**
 * VendorRatingResponseDto
 * @module vendor-service/application/dtos/responses
 */
export interface VendorRatingCategoryDto {
  readonly category: string;
  readonly score: number;
  readonly count: number;
}

export interface VendorRatingResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly overall: number;
  readonly totalReviews: number;
  readonly distribution: Readonly<Record<'1' | '2' | '3' | '4' | '5', number>>;
  readonly categories: readonly VendorRatingCategoryDto[];
  readonly positiveRatio: number;
  readonly negativeRatio: number;
  readonly recentWeight: number;
  readonly isDisplayable: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
