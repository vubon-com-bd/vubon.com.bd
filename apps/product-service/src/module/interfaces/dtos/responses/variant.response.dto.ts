import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VariantHttpResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  productId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  sku!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  isDefault!: boolean;
}
