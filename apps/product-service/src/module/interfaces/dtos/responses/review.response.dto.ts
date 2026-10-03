/**
 * Review Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly productId!: string;

  @ApiProperty()
  readonly userId!: string;

  @ApiPropertyOptional()
  readonly userName?: string;

  @ApiPropertyOptional()
  readonly userAvatar?: string;

  @ApiProperty({ example: 5 })
  readonly rating!: number;

  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly comment?: string;

  @ApiPropertyOptional({ type: [String] })
  readonly images?: readonly string[];

  @ApiProperty()
  readonly status!: string;

  @ApiProperty()
  readonly isVerifiedPurchase!: boolean;

  @ApiProperty()
  readonly helpfulCount!: number;

  @ApiProperty()
  readonly reportCount!: number;

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}

export class ReviewStatsResponseDTO {
  @ApiProperty()
  readonly productId!: string;

  @ApiProperty()
  readonly totalReviews!: number;

  @ApiProperty()
  readonly averageRating!: number;

  @ApiProperty({
    example: { 1: 2, 2: 5, 3: 10, 4: 30, 5: 50 },
  })
  readonly ratingDistribution!: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
}
