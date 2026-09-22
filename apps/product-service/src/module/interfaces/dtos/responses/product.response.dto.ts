import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductHttpResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  sku!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  vendorId!: string;

  @ApiPropertyOptional({ nullable: true })
  categoryId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  brandId?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
