import { ApiProperty } from '@nestjs/swagger';

export class RecommendationItemResponseDTO {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  score!: number;

  @ApiProperty()
  rank!: number;

  @ApiProperty({ nullable: true })
  reason!: string | null;
}

export class RecommendationResponseDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  strategy!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty({ type: [RecommendationItemResponseDTO] })
  items!: RecommendationItemResponseDTO[];

  @ApiProperty()
  generatedAt!: string;
}
