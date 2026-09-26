import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateRecommendationRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional({ example: 'personalized' })
  type?: string;

  @ApiPropertyOptional({ example: 'hybrid' })
  strategy?: string;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;

  @ApiPropertyOptional()
  sessionId?: string;
}

export class TrackClickRequestDTO {
  @ApiProperty()
  recommendationId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  productId!: string;

  @ApiPropertyOptional()
  position?: number;
}

export class TrackConversionRequestDTO {
  @ApiProperty()
  recommendationId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  productId!: string;

  @ApiPropertyOptional()
  orderId?: string;

  @ApiPropertyOptional()
  revenue?: number;
}

export class SubmitFeedbackRequestDTO {
  @ApiProperty()
  recommendationId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  productId!: string;

  @ApiProperty({ example: 5 })
  rating!: number;

  @ApiPropertyOptional()
  comment?: string;
}
