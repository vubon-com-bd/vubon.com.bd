/**
 * Fulfillment HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/fulfillment
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsDateString, IsInt, IsOptional, IsString, IsUUID,
  Max, Min, MinLength, MaxLength,
} from 'class-validator';

// ⚠️ Zod validator enforce করবে actual values
const FULFILLMENT_TYPE_VALUES = [
  'standard', 'express', 'same_day', 'backorder', 'pre_order', 'drop_ship',
] as const;

const FULFILLMENT_PRIORITY_VALUES = [
  'low', 'normal', 'high', 'urgent',
] as const;

// ─── Create ─────────────────────────────
export class CreateFulfillmentHttpDTO {
  @ApiProperty() @IsUUID()
  readonly orderId!: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vendorId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiProperty({ enum: FULFILLMENT_TYPE_VALUES })
  @IsString()
  readonly type!: string;

  @ApiPropertyOptional({ enum: FULFILLMENT_PRIORITY_VALUES })
  @IsOptional() @IsString()
  readonly priority?: string;

  @ApiProperty({ type: [String] }) @IsArray() @IsUUID('4', { each: true })
  readonly itemIds!: readonly string[];

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly assignedTo?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly slaDueAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000)
  readonly notes?: string;
}

// ─── Start / Ship / Fulfill ─────────────
export class FulfillmentReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListFulfillmentsHttpQueryDTO {
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

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly priority?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vendorId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'slaDueAt', 'priority'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
