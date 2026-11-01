/**
 * Driver HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/driver
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString, IsInt, IsNumber, IsOptional, IsString, IsUUID,
  Max, Min, MinLength, MaxLength,
} from 'class-validator';

// ⚠️ Zod enforce করবে actual values
const DRIVER_TYPE_VALUES = [
  'full_time', 'part_time', 'contractor', 'freelance',
] as const;

const DRIVER_LICENSE_TYPE_VALUES = [
  'professional', 'non_professional', 'learner', 'international',
] as const;

// ─── Create ─────────────────────────────
export class CreateDriverHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly userId?: string;

  @ApiProperty({ example: 'Karim Ahmed' })
  @IsString() @MinLength(2) @MaxLength(150)
  readonly name!: string;

  @ApiProperty({ example: '+8801700000000' })
  @IsString() @MinLength(5) @MaxLength(30)
  readonly phone!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  readonly email?: string;

  @ApiProperty({ enum: DRIVER_TYPE_VALUES })
  @IsString()
  readonly type!: string;

  @ApiProperty({ example: 'DL-123456' })
  @IsString() @MinLength(3) @MaxLength(50)
  readonly licenseNumber!: string;

  @ApiProperty({ enum: DRIVER_LICENSE_TYPE_VALUES })
  @IsString()
  readonly licenseType!: string;

  @ApiProperty({ example: '2028-12-31' })
  @IsDateString()
  readonly licenseExpiresAt!: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  readonly dateOfBirth?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly address?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly cashLimit?: number;
}

// ─── Update ─────────────────────────────
export class UpdateDriverHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly phone?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  readonly email?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly address?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly cashLimit?: number;
}

// ─── Assign Vehicle ─────────────────────
export class AssignVehicleHttpDTO {
  @ApiProperty() @IsUUID()
  readonly vehicleId!: string;
}

// ─── Cash Collect / Deposit ─────────────
export class CashTransactionHttpDTO {
  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01)
  readonly amount!: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly note?: string;
}

// ─── Reason ─────────────────────────────
export class DriverReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListDriversHttpQueryDTO {
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

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'name', 'totalDeliveries'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
