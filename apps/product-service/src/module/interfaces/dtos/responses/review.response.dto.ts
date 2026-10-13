/**
 * Review HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly userId!: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiProperty() readonly rating!: number;
  @ApiPropertyOptional() readonly title?: string;
  @ApiPropertyOptional() readonly comment?: string;
  @ApiPropertyOptional({ type: [String] }) readonly images?: readonly string[];
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly isVerifiedPurchase!: boolean;
  @ApiProperty() readonly helpfulCount!: number;
  @ApiProperty() readonly reportCount!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class ReviewPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly rating!: number;
  @ApiPropertyOptional() readonly title?: string;
  @ApiPropertyOptional() readonly comment?: string;
  @ApiPropertyOptional({ type: [String] }) readonly images?: readonly string[];
  @ApiProperty() readonly isVerifiedPurchase!: boolean;
  @ApiProperty() readonly helpfulCount!: number;
  @ApiProperty() readonly createdAt!: string;
}

export class ReviewSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly rating!: number;
  @ApiPropertyOptional() readonly title?: string;
  @ApiProperty() readonly createdAt!: string;
}

export class ReviewListHttpResponseDTO {
  @ApiProperty({ type: [ReviewPublicHttpResponseDTO] })
  readonly items!: readonly ReviewPublicHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class RatingDistributionHttpDTO {
  @ApiProperty() readonly 1!: number;
  @ApiProperty() readonly 2!: number;
  @ApiProperty() readonly 3!: number;
  @ApiProperty() readonly 4!: number;
  @ApiProperty() readonly 5!: number;
}

export class ReviewStatsHttpResponseDTO {
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly totalReviews!: number;
  @ApiProperty() readonly averageRating!: number;
  @ApiProperty({ type: RatingDistributionHttpDTO })
  readonly ratingDistribution!: RatingDistributionHttpDTO;
  @ApiProperty() readonly verifiedCount!: number;
  @ApiProperty() readonly approvedCount!: number;
  @ApiProperty() readonly pendingCount!: number;
}
