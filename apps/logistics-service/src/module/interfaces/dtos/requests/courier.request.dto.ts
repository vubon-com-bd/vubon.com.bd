/**
 * Courier HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests
 */
import {
  IsString, IsOptional, IsNumber, IsBoolean, IsArray, Min, MinLength, MaxLength, IsUrl, IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { COURIER_TYPE } from '@vubon/shared-constants/logistics';
import { IsEnum } from 'class-validator';

export class RegisterCourierHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) name!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50) code!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) displayName!: string;
  @ApiProperty({ enum: Object.values(COURIER_TYPE) }) @IsEnum(COURIER_TYPE) type!: string;
  @ApiPropertyOptional() @IsOptional() @IsUrl() logoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsUrl() website?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30) contactPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() contactEmail?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) trackingUrlTemplate?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() apiEnabled?: boolean;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() coverageZones?: string[];
  @ApiProperty() @IsBoolean() supportsCOD!: boolean;
  @ApiProperty() @IsBoolean() supportsInsurance!: boolean;
  @ApiProperty() @IsBoolean() supportsInternational!: boolean;
  @ApiProperty() @IsNumber() @Min(1) @Type(() => Number) averageDeliveryDays!: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) priority?: number;
}

export class UpdateCourierHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) displayName?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) priority?: number;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() coverageZones?: string[];
}

export class SuspendCourierHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}

export class ActivateCourierHttpDTO {}

export class DeactivateCourierHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class SetCourierDefaultHttpDTO {
  @ApiProperty() @IsBoolean() isDefault!: boolean;
}

export class ListCouriersHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() supportsCOD?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() supportsInternational?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() zone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() sortBy?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sortDir?: 'asc' | 'desc';
}
