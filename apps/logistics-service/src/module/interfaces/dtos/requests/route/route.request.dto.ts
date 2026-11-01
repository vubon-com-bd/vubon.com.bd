/**
 * Route HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/route
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsDateString, IsInt, IsNumber, IsOptional,
  IsString, IsUUID, Max, Min, MinLength, MaxLength, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

const ROUTE_TYPE_VALUES = [
  'delivery', 'pickup', 'mixed', 'inter_warehouse', 'return',
] as const;

const ROUTE_OPTIMIZATION_VALUES = [
  'manual', 'nearest_neighbor', 'genetic', 'ant_colony', 'or_tools',
] as const;

// ─── Stop ───────────────────────────────
export class RouteStopHttpDTO {
  @ApiProperty() @IsString() @MinLength(1) @MaxLength(50)
  readonly id!: string;

  @ApiProperty() @IsInt() @Min(1)
  readonly order!: number;

  @ApiProperty() @IsString() @MinLength(1) @MaxLength(255)
  readonly location!: string;

  @ApiProperty() @IsString() @MinLength(5) @MaxLength(500)
  readonly address!: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(-90) @Max(90)
  readonly latitude?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(-180) @Max(180)
  readonly longitude?: number;

  @ApiProperty({ type: [String] }) @IsArray() @IsUUID('4', { each: true })
  readonly shipmentIds!: readonly string[];

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly estimatedArrivalAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly notes?: string;
}

// ─── Create ─────────────────────────────
export class CreateRouteHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150)
  readonly name!: string;

  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50)
  readonly code!: string;

  @ApiProperty({ enum: ROUTE_TYPE_VALUES }) @IsString()
  readonly type!: string;

  @ApiProperty({ enum: ROUTE_OPTIMIZATION_VALUES }) @IsString()
  readonly optimization!: string;

  @ApiProperty({ type: [RouteStopHttpDTO] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => RouteStopHttpDTO)
  readonly stops!: readonly RouteStopHttpDTO[];

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vehicleId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiProperty() @IsDateString()
  readonly scheduledDate!: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isRecurring?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly recurrenceRule?: string;
}

// ─── Update ─────────────────────────────
export class UpdateRouteHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vehicleId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly scheduledDate?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isRecurring?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly recurrenceRule?: string;
}

// ─── Optimize ───────────────────────────
export class OptimizeRouteHttpDTO {
  @ApiPropertyOptional({ enum: ROUTE_OPTIMIZATION_VALUES })
  @IsOptional() @IsString()
  readonly algorithm?: string;
}

// ─── Complete Stop ──────────────────────
export class CompleteStopHttpDTO {
  @ApiProperty() @IsString() @MinLength(1) @MaxLength(50)
  readonly stopId!: string;
}

// ─── Cancel ─────────────────────────────
export class RouteReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListRoutesHttpQueryDTO {
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
  readonly warehouseId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly driverId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly vehicleId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'scheduledDate', 'totalDistanceKm'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
