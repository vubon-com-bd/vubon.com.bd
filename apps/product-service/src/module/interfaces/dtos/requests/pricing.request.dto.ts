/**
 * Pricing HTTP Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsEnum, IsInt, IsNumber, IsObject, IsOptional,
  IsString, IsUUID, Length, Min,
} from 'class-validator';

const PRICING_TYPE_VALUES = ['fixed', 'dynamic', 'tiered', 'auction', 'negotiable'];

export class UpdatePriceHttpDTO {
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly sellingPrice!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly compareAtPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly costPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reason?: string;

  @ApiPropertyOptional({ enum: ['admin', 'vendor', 'staff'] })
  @IsOptional()
  @IsEnum(['admin', 'vendor', 'staff'])
  readonly actorRole?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly bypassMinMargin?: boolean;
}

export class CreatePricingRuleHttpDTO {
  @ApiProperty({ example: 'Bulk discount' })
  @IsString()
  @Length(1, 150)
  readonly name!: string;

  @ApiProperty({ enum: PRICING_TYPE_VALUES })
  @IsEnum(PRICING_TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ example: { minQuantity: 10 } })
  @IsObject()
  readonly conditions!: Readonly<Record<string, unknown>>;

  @ApiProperty({ example: 5 })
  @IsNumber()
  readonly priceAdjustment!: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly isPercent!: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly priority?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class UpdatePricingRuleHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly conditions?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly priceAdjustment?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isPercent?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly priority?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}

export class CalculatePriceHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly productId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly variantId?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  readonly quantity!: number;

  @ApiPropertyOptional({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly applyAit?: boolean;
}
