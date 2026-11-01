/**
 * Pricing HTTP Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsEnum, IsInt, IsNumber, IsObject, IsOptional,
  IsString, IsUUID, Length, Min,
} from 'class-validator';

const PRICING_TYPE_VALUES = ['fixed', 'dynamic', 'tiered', 'auction', 'negotiable'] as const;

export class UpdatePriceHttpDTO {
  @ApiProperty({ description: 'New selling price', example: 1500 })
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  sellingPrice!: number;

  @ApiPropertyOptional({ description: 'Compare-at price', example: 2000 })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  compareAtPrice?: number;

  @ApiPropertyOptional({ description: 'Cost price', example: 1000 })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0)
  costPrice?: number;

  @ApiPropertyOptional({ description: 'Change reason', example: 'Seasonal discount' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    description: 'Actor role',
    enum: ['admin', 'vendor', 'staff'],
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(['admin', 'vendor', 'staff'])
  actorRole?: string;

  @ApiPropertyOptional({ description: 'Bypass minimum margin check', example: false })
  @IsOptional()
  @IsBoolean()
  bypassMinMargin?: boolean;
}

export class CreatePricingRuleHttpDTO {
  @ApiProperty({ example: 'Bulk discount' })
  @IsString()
  @Length(1, 150)
  name!: string;

  @ApiProperty({ enum: PRICING_TYPE_VALUES })
  @IsEnum(PRICING_TYPE_VALUES)
  type!: string;

  @ApiProperty({ example: { minQuantity: 10 } })
  @IsObject()
  conditions!: Readonly<Record<string, unknown>>;

  @ApiProperty({ example: 5 })
  @IsNumber()
  priceAdjustment!: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  isPercent!: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdatePricingRuleHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  conditions?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  priceAdjustment?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPercent?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  priority?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CalculatePriceHttpDTO {
  @ApiProperty()
  @IsUUID()
  productId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  variantId?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  applyAit?: boolean;
}
