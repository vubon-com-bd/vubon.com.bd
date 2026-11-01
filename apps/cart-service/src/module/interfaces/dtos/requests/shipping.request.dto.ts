/**
 * Shipping HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

const SHIPPING_METHOD_VALUES = [
  'standard',
  'express',
  'same_day',
  'pickup',
  'international',
];

// ─── Set Shipping Method ────────────────────
export class SetShippingMethodHttpDTO {
  @ApiProperty({ enum: SHIPPING_METHOD_VALUES })
  @IsEnum(SHIPPING_METHOD_VALUES)
  readonly method!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly addressId?: string;

  @ApiPropertyOptional({ example: 60, minimum: 0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly cost?: number;

  @ApiPropertyOptional({ example: 1000, minimum: 0 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly freeAbove?: number;

  @ApiPropertyOptional({ example: 5, minimum: 0, maximum: 90 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(90)
  readonly estimatedDays?: number;
}

// ─── Calculate Shipping (dry-run) ───────────
export class CalculateShippingHttpDTO {
  @ApiProperty({ enum: SHIPPING_METHOD_VALUES })
  @IsEnum(SHIPPING_METHOD_VALUES)
  readonly method!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly addressId?: string;
}
