import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewHttpResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  productId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  rating!: number;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  status!: string;
}
