/**
 * Dispatch HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/dispatch
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsDateString, IsInt, IsNumber, IsOptional, IsString, IsUUID,
  Max, Min, MaxLength,
} from 'class-validator';

const DISPATCH_TYPE_VALUES = [
  'standard', 'express', 'bulk', 'returns', 'inter_warehouse',
] as const;

// ─── Create ─────────────────────────────
export class CreateDispatchHttpDTO {
  @ApiProperty({ enum: DISPATCH_TYPE_VALUES })
  @IsString()
  readonly type!: string;

  @ApiProperty({ type: [String] }) @IsArray() @IsUUID('4', { each: true })
  readonly shipmentIds!: readonly string[];

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly courierId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vehicleId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly totalWeight?: number;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly estimatedArrivalAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000)
  readonly notes?: string;
}

// ─── Assign ─────────────────────────────
export class AssignDispatchHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vehicleId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly courierId?: string;
}

// ─── Reason (cancel/fail/return) ────────
export class DispatchReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListDispatchesHttpQueryDTO {
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
  readonly courierId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'dispatchedAt', 'estimatedArrivalAt'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
