import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SavedForLaterResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  productId!: string;

  @ApiPropertyOptional()
  variantId?: string | null;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  savedAt!: string;
}
