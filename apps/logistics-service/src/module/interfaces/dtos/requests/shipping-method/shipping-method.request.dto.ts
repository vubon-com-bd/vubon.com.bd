/**
 * ShippingMethod HTTP Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString,
  Length, Max, Min, MinLength, MaxLength,
} from 'class-validator';

const SHIPPING_METHOD_TYPE_VALUES = [
  'standard', 'express', 'same_day', 'next_day', 'overnight', 'international', 'freight',
] as const;

const SHIPPING_RATE_TYPE_VALUES = [
  'flat', 'weight_based', 'distance_based', 'free',
] as const;

export class CreateShippingMethodHttpDTO {
  @ApiProperty({ example: 'Standard Delivery' })
  @IsString() @MinLength(2) @MaxLength(150)
  readonly name!: string;

  @ApiProperty({ example: 'STD' })
  @IsString() @MinLength(2) @MaxLength(50)
  readonly code!: string;

  @ApiProperty({ example: 'Standard Delivery' })
  @IsString() @MinLength(2) @MaxLength(150)
  readonly displayName!: string;

  @ApiProperty({ enum: SHIPPING_METHOD_TYPE_VALUES }) @IsString()
  readonly type!: string;

  @ApiProperty({ enum: SHIPPING_RATE_TYPE_VALUES }) @IsString()
  readonly rateType!: string;

  @ApiProperty({ example: 60 })
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly baseCost!: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly freeAbove?: number;

  @ApiProperty({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsString() @Length(3, 3)
  readonly currency!: string;

  @ApiProperty({ example: 1 })
  @IsInt() @Min(1) @Max(30)
  readonly minDeliveryDays!: number;

  @ApiProperty({ example: 3 })
  @IsInt() @Min(1) @Max(30)
  readonly maxDeliveryDays!: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxWeightKg?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly maxDimensionsCm?: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly codEnabled!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly trackingEnabled!: boolean;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly coverageZones?: readonly string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly couriers?: readonly string[];

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isDefault?: boolean;
}

export class UpdateShippingMethodHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly displayName?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly baseCost?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly freeAbove?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(30)
  readonly minDeliveryDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(30)
  readonly maxDeliveryDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxWeightKg?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly maxDimensionsCm?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly codEnabled?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly trackingEnabled?: boolean;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly coverageZones?: readonly string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly couriers?: readonly string[];
}

export class ShippingMethodReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

export class ListShippingMethodsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 }) @IsOptional() @IsInt() @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 }) @IsOptional() @IsInt() @Min(1) @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly type?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'name', 'baseCost'] }) @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] }) @IsOptional() @IsString()
  readonly sortDir?: string;
}
