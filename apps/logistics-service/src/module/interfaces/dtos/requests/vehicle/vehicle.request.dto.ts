/**
 * Vehicle HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/vehicle
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsString, IsUUID,
  Max, Min, MinLength, MaxLength,
} from 'class-validator';

// ⚠️ Zod enforce করবে actual values
const VEHICLE_TYPE_VALUES = [
  'truck', 'van', 'bike', 'car', 'bicycle', 'cargo_truck', 'mini_truck',
] as const;

const VEHICLE_FUEL_TYPE_VALUES = [
  'petrol', 'diesel', 'electric', 'cng', 'hybrid', 'lpg',
] as const;

// ─── Create ─────────────────────────────
export class CreateVehicleHttpDTO {
  @ApiProperty({ example: 'DHK-GA-1234' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  readonly registrationNumber!: string;

  @ApiProperty({ enum: VEHICLE_TYPE_VALUES })
  @IsString()
  readonly type!: string;

  @ApiProperty({ enum: VEHICLE_FUEL_TYPE_VALUES })
  @IsString()
  readonly fuelType!: string;

  @ApiProperty({ example: 'Toyota' })
  @IsString() @MinLength(1) @MaxLength(50)
  readonly make!: string;

  @ApiProperty({ example: 'Hiace' })
  @IsString() @MinLength(1) @MaxLength(50)
  readonly model!: string;

  @ApiProperty({ example: 2020 })
  @IsInt() @Min(1900) @Max(2100)
  readonly year!: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly color?: string;

  @ApiProperty({ example: 1000 })
  @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxWeightKg!: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxVolumeM3?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly capacity?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly mileageKm?: number;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly insuranceExpiresAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly registrationExpiresAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;
}

// ─── Update ─────────────────────────────
export class UpdateVehicleHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly color?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxWeightKg?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxVolumeM3?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly capacity?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly mileageKm?: number;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly insuranceExpiresAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly registrationExpiresAt?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;
}

// ─── Assign Driver ──────────────────────
export class AssignDriverHttpDTO {
  @ApiProperty() @IsUUID()
  readonly driverId!: string;
}

// ─── Reason ─────────────────────────────
export class VehicleReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListVehiclesHttpQueryDTO {
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

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'year', 'mileageKm'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
