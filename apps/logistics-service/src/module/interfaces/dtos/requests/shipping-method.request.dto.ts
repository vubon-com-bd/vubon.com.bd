import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsEnum, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SHIPPING_RATE_TYPE } from '@vubon/shared-constants/logistics';

export class CreateShippingMethodHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) name!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50) code!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) displayName!: string;
  @ApiProperty({ enum: Object.values(SHIPPING_RATE_TYPE) }) @IsEnum(SHIPPING_RATE_TYPE) rateType!: string;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) baseCost!: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) freeAbove?: number;
  @ApiProperty() @IsString() @MaxLength(3) currency!: string;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) minDeliveryDays!: number;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) maxDeliveryDays!: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) maxWeightKg?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) maxDimensionsCm?: number;
  @ApiProperty() @IsBoolean() codEnabled!: boolean;
  @ApiProperty() @IsBoolean() trackingEnabled!: boolean;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() coverageZones?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() couriers?: string[];
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isDefault?: boolean;
}

export class UpdateShippingMethodHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) displayName?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) baseCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(3) currency?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) minDeliveryDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) maxDeliveryDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() codEnabled?: boolean;
}

export class ShippingMethodReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class SuspendReasonHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class CalculateShippingHttpDTO {
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) orderValue!: number;
  @ApiProperty() @IsNumber() @Min(0.001) @Type(() => Number) weightKg!: number;
}

export class ListShippingMethodsHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() code?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() zoneId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() codEnabled?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
