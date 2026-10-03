/**
 * Review Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitReviewRequestDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly productId!: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  readonly rating!: number;

  @ApiPropertyOptional({ example: 'Excellent product' })
  readonly title?: string;

  @ApiPropertyOptional({ example: 'Very good quality and fast delivery.' })
  readonly comment?: string;

  @ApiPropertyOptional({ type: [String], example: ['https://cdn.vubon.com.bd/reviews/1.jpg'] })
  readonly images?: readonly string[];
}

export class UpdateReviewRequestDTO {
  @ApiProperty()
  readonly reviewId!: string;

  @ApiPropertyOptional()
  readonly rating?: number;

  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly comment?: string;

  @ApiPropertyOptional({ type: [String] })
  readonly images?: readonly string[];

  @ApiProperty()
  readonly updatedBy!: string;
}

export class ApproveReviewRequestDTO {
  @ApiProperty()
  readonly reviewId!: string;

  @ApiProperty()
  readonly moderatorId!: string;
}

export class RejectReviewRequestDTO {
  @ApiProperty()
  readonly reviewId!: string;

  @ApiProperty()
  readonly reason!: string;

  @ApiProperty()
  readonly moderatorId!: string;
}

export class ReportReviewRequestDTO {
  @ApiProperty()
  readonly reviewId!: string;

  @ApiProperty()
  readonly userId!: string;

  @ApiProperty()
  readonly reason!: string;
}
