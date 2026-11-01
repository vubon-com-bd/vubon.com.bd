/**
 * Courier HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/courier
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsInt, IsOptional, IsString,
  IsUrl, Length, Max, Min, MinLength, MaxLength,
} from 'class-validator';

const COURIER_TYPE_VALUES = [
  'local', 'national', 'international', 'third_party', 'in_house', 'marketplace',
] as const;

// ─── Create ─────────────────────────────
export class CreateCourierHttpDTO {
  @ApiProperty({ example: 'PATHAO' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly code!: string;

  @ApiProperty({ example: 'Pathao' })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name!: string;

  @ApiProperty({ example: 'Pathao Courier' })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly displayName!: string;

  @ApiProperty({ enum: COURIER_TYPE_VALUES })
  @IsString()
  readonly type!: string;

  @ApiPropertyOptional({ example: 'https://pathao.com/logo.png' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly logoUrl?: string;

  @ApiPropertyOptional({ example: 'https://pathao.com' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly website?: string;

  @ApiPropertyOptional({ example: '+8801700000000' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  readonly contactPhone?: string;

  @ApiPropertyOptional({ example: 'support@pathao.com' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly contactEmail?: string;

  @ApiPropertyOptional({ example: 'https://pathao.com/track/{trackingNumber}' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly trackingUrlTemplate?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly apiEnabled!: boolean;

  @ApiPropertyOptional({ example: ['dhaka', 'chittagong'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly coverageZones?: readonly string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly supportsCOD!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly supportsInsurance!: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly supportsInternational!: boolean;

  @ApiProperty({ example: 3, minimum: 1, maximum: 30 })
  @IsInt()
  @Min(1)
  @Max(30)
  readonly averageDeliveryDays!: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  readonly isDefault?: boolean;

  @ApiPropertyOptional({ example: 50, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly priority?: number;
}

// ─── Update ─────────────────────────────
export class UpdateCourierHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly displayName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly logoUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly website?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly contactPhone?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  readonly contactEmail?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly trackingUrlTemplate?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly apiEnabled?: boolean;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly coverageZones?: readonly string[];

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly supportsCOD?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly supportsInsurance?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly supportsInternational?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(30)
  readonly averageDeliveryDays?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(100)
  readonly priority?: number;
}

// ─── Action (reason required) ───────────
export class CourierReasonHttpDTO {
  @ApiPropertyOptional({ example: 'API integration failed' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListCouriersHttpQueryDTO {
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

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly apiEnabled?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly supportsCOD?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'priority', 'name', 'averageDeliveryDays'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
