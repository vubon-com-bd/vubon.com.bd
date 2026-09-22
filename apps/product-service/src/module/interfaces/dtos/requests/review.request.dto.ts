import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitReviewHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 5 })
  rating!: number;

  @ApiProperty()
  content!: string;
}

export class UpdateReviewHttpDto {
  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  rating?: number;
}

export class RejectReviewHttpDto {
  @ApiProperty()
  reason!: string;
}
