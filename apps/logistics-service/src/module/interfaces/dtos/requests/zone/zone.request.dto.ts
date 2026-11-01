/**
 * Zone HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/zone
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID,
  Length, Max, Min, MinLength, MaxLength,
} from 'class-validator';

const ZONE_TYPE_VALUES = [
  'division', 'district', 'city', 'thana', 'union', 'custom', 'postal',
] as const;

const ZONE_PRICING_TYPE_VALUES = [
  'flat', 'weight_based', 'distance_based', 'zone_based',
] as const;

// ─── Create ─────────────────────────────
export class CreateZoneHttpDTO {
  @ApiProperty({ example: 'DHK-NORTH' })
  @IsString() @MinLength(2) @MaxLength(50)
  readonly code!: string;

  @ApiProperty({ example: 'Dhaka North' })
  @IsString() @MinLength(2) @MaxLength(150)
  readonly name!: string;

  @ApiProperty({ enum: ZONE_TYPE_VALUES }) @IsString()
  readonly type!: string;

  @ApiProperty({ enum: ZONE_PRICING_TYPE_VALUES }) @IsString()
  readonly pricingType!: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly parentId?: string;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly postalCodes?: readonly string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly districts?: readonly string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly divisions?: readonly string[];

  @ApiProperty({ example: 60 })
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly shippingCost!: number;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
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

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly codEnabled!: boolean;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly codCharge?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly codMaxAmount?: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly isRemote!: boolean;
}

// ─── Update ─────────────────────────────
export class UpdateZoneHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly postalCodes?: readonly string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly districts?: readonly string[];

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly divisions?: readonly string[];

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly shippingCost?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly freeAbove?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(30)
  readonly minDeliveryDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(30)
  readonly maxDeliveryDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly codEnabled?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly codCharge?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly codMaxAmount?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isRemote?: boolean;
}

// ─── Reason ─────────────────────────────
export class ZoneReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListZonesHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional() @IsInt() @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 })
  @IsOptional() @IsInt() @Min(1) @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly type?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly parentId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'name', 'shippingCost'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
