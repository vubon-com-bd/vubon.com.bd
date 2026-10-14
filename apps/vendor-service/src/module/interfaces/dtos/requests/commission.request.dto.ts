/**
 * Commission HTTP Request DTOs
 * @module vendor-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsNumber, IsOptional, IsString, IsUUID,
  Max, Min,
} from 'class-validator';

export const COMMISSION_TYPE_VALUES = [
  'percentage', 'fixed', 'tiered', 'hybrid', 'category_based',
] as const;

export class UpdateCommissionHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly vendorId!: string;

  @ApiPropertyOptional({ enum: COMMISSION_TYPE_VALUES })
  @IsOptional()
  @IsEnum(COMMISSION_TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional({ example: 15, minimum: 1, maximum: 50 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @Max(50)
  readonly rate?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly fixedAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly minAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly maxAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly effectiveFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly effectiveTo?: string;
}

export class CalculateCommissionHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly vendorId!: string;

  @ApiProperty({ example: 1500.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly orderAmount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly discountAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly currency?: string;
}
