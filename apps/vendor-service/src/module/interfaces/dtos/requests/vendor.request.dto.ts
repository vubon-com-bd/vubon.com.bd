/**
 * Vendor HTTP Request DTOs
 * @module vendor-service/interfaces/dtos/requests
 *
 * Double validation:
 *  - class-validator → runtime (via NestJS ValidationPipe)
 *  - Swagger → API docs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  VENDOR_TYPE,
  VENDOR_BUSINESS_TYPE,
  VENDOR_STATUS,
  VENDOR_TIER,
} from '@vubon/shared-constants/business/vendor';

const VENDOR_TYPE_VALUES = Object.values(VENDOR_TYPE) as string[];
const VENDOR_BUSINESS_TYPE_VALUES = Object.values(VENDOR_BUSINESS_TYPE) as string[];
const VENDOR_STATUS_VALUES = Object.values(VENDOR_STATUS) as string[];
const VENDOR_TIER_VALUES = Object.values(VENDOR_TIER) as string[];

// ─── Register DTO ──────────────────────────
export class RegisterVendorHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ example: 'Acme Traders' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  readonly name!: string;

  @ApiProperty({ example: 'Acme Traders Ltd' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  readonly displayName!: string;

  @ApiProperty({ example: 'acme-traders' })
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  readonly slug!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  readonly description?: string;

  @ApiProperty({ enum: VENDOR_TYPE_VALUES })
  @IsEnum(VENDOR_TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: VENDOR_BUSINESS_TYPE_VALUES })
  @IsEnum(VENDOR_BUSINESS_TYPE_VALUES)
  readonly businessType!: string;

  @ApiProperty({ example: 'vendor@example.com' })
  @IsEmail()
  readonly email!: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  readonly phone?: string;
}

// ─── Update DTO ─────────────────────────────
export class UpdateVendorHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  readonly displayName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  readonly description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly bannerUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly website?: string;
}

// ─── List Query DTO ────────────────────────
export class ListVendorsHttpQueryDTO {
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

  @ApiPropertyOptional({ enum: VENDOR_STATUS_VALUES })
  @IsOptional()
  @IsEnum(VENDOR_STATUS_VALUES)
  readonly status?: string;

  @ApiPropertyOptional({ enum: VENDOR_TYPE_VALUES })
  @IsOptional()
  @IsEnum(VENDOR_TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional({ enum: VENDOR_TIER_VALUES })
  @IsOptional()
  @IsEnum(VENDOR_TIER_VALUES)
  readonly tier?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isVerified?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly search?: string;
}

// ─── Stats Query DTO ────────────────────────
export class VendorStatsHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VENDOR_STATUS_VALUES)
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VENDOR_TYPE_VALUES)
  readonly type?: string;
}

// ─── Delete DTO ─────────────────────────────
export class DeleteVendorHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  readonly force?: boolean;
}

// ─── Status change DTO ──────────────────────
export class ChangeVendorStatusHttpDTO {
  @ApiProperty({ enum: VENDOR_STATUS_VALUES })
  @IsEnum(VENDOR_STATUS_VALUES)
  readonly status!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

void Length;
