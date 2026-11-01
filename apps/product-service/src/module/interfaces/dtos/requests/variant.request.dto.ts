/**
 * Variant HTTP Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional,
  IsString, IsUUID, Length, Max, Min, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

const VARIANT_TYPE_VALUES = [
  'size', 'color', 'material', 'style', 'weight', 'volume', 'pack',
];

export class VariantOptionHttpDTO {
  @ApiProperty({ example: 'size' })
  @IsString()
  @Length(1, 100)
  readonly name!: string;

  @ApiProperty({ example: 'M' })
  @IsString()
  @Length(1, 100)
  readonly value!: string;
}

export class AddVariantHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly productId!: string;

  @ApiProperty({ example: 'T-Shirt - Medium' })
  @IsString()
  @Length(1, 100)
  readonly name!: string;

  @ApiProperty({ example: 'TSHIRT-M' })
  @IsString()
  @Length(1, 64)
  readonly sku!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly barcode?: string;

  @ApiProperty({ enum: VARIANT_TYPE_VALUES })
  @IsEnum(VARIANT_TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ type: [VariantOptionHttpDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionHttpDTO)
  readonly options!: readonly VariantOptionHttpDTO[];

  @ApiProperty({ example: 1250.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly price!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly compareAtPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly weight?: number;
}

export class UpdateVariantHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly sku?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly barcode?: string;

  @ApiPropertyOptional({ type: [VariantOptionHttpDTO] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionHttpDTO)
  readonly options?: readonly VariantOptionHttpDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly compareAtPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly weight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class ListVariantsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly productId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly inStock?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly sku?: string;
}
