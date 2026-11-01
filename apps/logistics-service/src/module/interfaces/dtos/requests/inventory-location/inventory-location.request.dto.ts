/**
 * InventoryLocation HTTP Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID,
  Max, Min, MinLength, MaxLength,
} from 'class-validator';

export class CreateInventoryLocationHttpDTO {
  @ApiProperty() @IsUUID()
  readonly warehouseId!: string;

  @ApiProperty({ example: 'A-01-01-BIN01' })
  @IsString() @MinLength(2) @MaxLength(100)
  readonly code!: string;

  @ApiProperty({ example: 'Rack A, Shelf 1' })
  @IsString() @MinLength(2) @MaxLength(150)
  readonly name!: string;

  @ApiProperty({ example: 'storage' })
  @IsString() @MinLength(2) @MaxLength(30)
  readonly zone!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly aisle?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly rack?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly shelf?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly bin?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  readonly barcode?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxCapacityKg?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxCapacityM3?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isPickable?: boolean;

  @ApiPropertyOptional({ minimum: 0, maximum: 100 }) @IsOptional() @IsInt() @Min(0) @Max(100)
  readonly priority?: number;
}

export class UpdateInventoryLocationHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly zone?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly aisle?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly rack?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly shelf?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly bin?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxCapacityKg?: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxCapacityM3?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isPickable?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Max(100)
  readonly priority?: number;
}

export class StockChangeHttpDTO {
  @ApiProperty() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0.001)
  readonly weightKg!: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly volumeM3?: number;
}

export class QuarantineHttpDTO {
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(500)
  readonly reason!: string;
}

export class InventoryLocationReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

export class ListInventoryLocationsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 }) @IsOptional() @IsInt() @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 }) @IsOptional() @IsInt() @Min(1) @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly warehouseId?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  readonly zone?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'code', 'priority'] }) @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] }) @IsOptional() @IsString()
  readonly sortDir?: string;
}
