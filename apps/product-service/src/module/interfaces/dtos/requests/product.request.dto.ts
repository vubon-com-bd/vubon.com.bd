/**
 * Product HTTP Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional,
  IsString, IsUUID, Length, Max, Min, MinLength,
} from 'class-validator';

const PRODUCT_TYPE_VALUES = [
  'physical', 'digital', 'service', 'subscription', 'bundle', 'variable', 'simple', 'gift_card',
];
const PRODUCT_STATUS_VALUES = [
  'draft', 'pending', 'approved', 'published', 'rejected',
  'out_of_stock', 'discontinued', 'archived', 'deleted',
];

export class CreateProductHttpDTO {
  @ApiProperty({ example: 'Premium T-Shirt' })
  @IsString()
  @Length(3, 200)
  readonly name!: string;

  @ApiProperty({ example: 'premium-t-shirt' })
  @IsString()
  @Length(3, 200)
  readonly slug!: string;

  @ApiProperty({ example: 'TSHIRT-001' })
  @IsString()
  @Length(3, 64)
  readonly sku!: string;

  @ApiPropertyOptional({ example: 'Soft cotton t-shirt' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({ example: 'Soft cotton' })
  @IsOptional()
  @IsString()
  readonly shortDescription?: string;

  @ApiProperty({ enum: PRODUCT_TYPE_VALUES, example: 'physical' })
  @IsEnum(PRODUCT_TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly categoryId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly brandId?: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly vendorId?: string;

  @ApiPropertyOptional({ example: ['summer', 'cotton'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: readonly string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images?: readonly string[];

  @ApiProperty({ example: 1250.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly price!: number;

  @ApiPropertyOptional({ example: 1500.0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly compareAtPrice?: number;

  @ApiProperty({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiPropertyOptional({ example: '1234567890' })
  @IsOptional()
  @IsString()
  readonly barcode?: string;

  @ApiPropertyOptional({ example: 250 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly weight?: number;

  @ApiPropertyOptional({ example: { length: 30, width: 20, height: 5, unit: 'cm' } })
  @IsOptional()
  readonly dimensions?: {
    readonly length: number;
    readonly width: number;
    readonly height: number;
    readonly unit: 'cm' | 'in';
  };
}

export class UpdateProductHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(3, 200)
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly shortDescription?: string;

  @ApiPropertyOptional({ enum: PRODUCT_STATUS_VALUES })
  @IsOptional()
  @IsEnum(PRODUCT_STATUS_VALUES)
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly brandId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: readonly string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images?: readonly string[];

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
  @IsBoolean()
  readonly isFeatured?: boolean;
}

export class PublishProductHttpDTO {
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  readonly requireImages?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  readonly requireStock?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly minStockThreshold?: number;
}

export class ListProductsHttpQueryDTO {
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
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly brandId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly vendorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly inStock?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  readonly sortDir?: 'asc' | 'desc';
}
