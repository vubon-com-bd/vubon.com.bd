import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductHttpDto {
  @ApiProperty({ example: 'Wireless Headphones' })
  name!: string;

  @ApiPropertyOptional({ example: 'vendor-uuid' })
  vendorId?: string;

  @ApiPropertyOptional({ example: 'simple' })
  type?: string;

  @ApiPropertyOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  brandId?: string;

  @ApiPropertyOptional()
  description?: string;
}

export class UpdateProductHttpDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional({ nullable: true })
  categoryId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  brandId?: string | null;
}

export class PublishProductHttpDto {
  @ApiProperty()
  productId!: string;
}

export class ArchiveProductHttpDto {
  @ApiProperty()
  productId!: string;
}

export class DuplicateProductHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  newName!: string;
}

export class AddAttributeHttpDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  value!: string;
}
