import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VariantOptionHttpDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  value!: string;
}

export class AddVariantHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  sku!: string;

  @ApiProperty({ example: 1000 })
  price!: number;

  @ApiPropertyOptional({ example: 'single' })
  variantType?: string;

  @ApiPropertyOptional({ type: [VariantOptionHttpDto] })
  options?: VariantOptionHttpDto[];

  @ApiPropertyOptional()
  weight?: number;

  @ApiPropertyOptional()
  barcode?: string;
}

export class UpdateVariantHttpDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  price?: number;
}

export class SetDefaultVariantHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  variantId!: string;
}
