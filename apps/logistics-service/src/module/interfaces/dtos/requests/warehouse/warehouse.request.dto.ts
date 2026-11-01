/**
 * Warehouse HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests/warehouse
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID,
  Length, Max, Min, MinLength, MaxLength,
} from 'class-validator';

// ⚠️ Zod validator enforce করবে actual values
const WAREHOUSE_TYPE_VALUES = [
  'main', 'satellite', 'transit', 'cold_storage', 'bonded', 'fulfillment_center',
] as const;

// ─── Create ─────────────────────────────
export class CreateWarehouseHttpDTO {
  @ApiProperty({ example: 'WH-DHK-01' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly code!: string;

  @ApiProperty({ example: 'Dhaka Main Warehouse' })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name!: string;

  @ApiProperty({ enum: WAREHOUSE_TYPE_VALUES })
  @IsString()
  readonly type!: string;

  @ApiProperty({ example: '123 Warehouse Road, Dhaka' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  readonly address!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly contactName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly contactPhone?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  readonly contactEmail?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly managerId?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly capacityM3?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly capacityKg?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly maxSkus?: number;

  @ApiProperty({ example: 'Dhaka-North' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly zone!: string;

  @ApiPropertyOptional({ example: 6 })
  @IsOptional() @IsInt() @Min(0) @Max(23)
  readonly operatingHoursStart?: number;

  @ApiPropertyOptional({ example: 22 })
  @IsOptional() @IsInt() @Min(0) @Max(23)
  readonly operatingHoursEnd?: number;

  @ApiProperty({ example: 'Asia/Dhaka' })
  @IsString()
  @MaxLength(60)
  readonly timezone!: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isDefault?: boolean;
}

// ─── Update ─────────────────────────────
export class UpdateWarehouseHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly address?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly contactName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly contactPhone?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(255)
  readonly contactEmail?: string;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly maxSkus?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Max(23)
  readonly operatingHoursStart?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Max(23)
  readonly operatingHoursEnd?: number;
}

// ─── Capacity Update ────────────────────
export class UpdateCapacityHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly capacityM3?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly capacityKg?: number;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0)
  readonly maxSkus?: number;
}

// ─── Reason DTO (close/archive/deactivate) ───
export class WarehouseReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

// ─── List Query ─────────────────────────
export class ListWarehousesHttpQueryDTO {
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

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  readonly zone?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isDefault?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'name', 'zone'] })
  @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional() @IsString()
  readonly sortDir?: string;
}
