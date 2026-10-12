import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsEnum, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ZONE_TYPE, ZONE_PRICING_TYPE } from '@vubon/shared-constants/logistics';

export class CreateZoneHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) name!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50) code!: string;
  @ApiProperty({ enum: Object.values(ZONE_TYPE) }) @IsEnum(ZONE_TYPE) type!: string;
  @ApiProperty({ enum: Object.values(ZONE_PRICING_TYPE) }) @IsEnum(ZONE_PRICING_TYPE) pricingType!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() parentId?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() postalCodes?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() districts?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() divisions?: string[];
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) shippingCost!: number;
  @ApiProperty() @IsString() @MaxLength(3) currency!: string;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) minDeliveryDays!: number;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) maxDeliveryDays!: number;
  @ApiProperty() @IsBoolean() codEnabled!: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) codCharge?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) codMaxAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isRemote?: boolean;
}

export class UpdateZoneHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) name?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) shippingCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(3) currency?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) minDeliveryDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) maxDeliveryDays?: number;
}

export class ZoneReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class SuspendZoneHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class ListZonesHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() parentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isRemote?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
