/**
 * Warehouse HTTP Request DTOs
 * @module logistics-service/interfaces/dtos/requests
 */
import { IsString, IsOptional, IsNumber, IsBoolean, Min, MinLength, MaxLength, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WAREHOUSE_TYPE } from '@vubon/shared-constants/logistics';

class WarehouseAddressHttpDTO {
  @ApiProperty() @IsString() @MinLength(3) @MaxLength(255) line1!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() line2?: string;
  @ApiProperty() @IsString() city!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() state?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() postalCode?: string;
  @ApiProperty() @IsString() country!: string;
}

export class CreateWarehouseHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) name!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50) code!: string;
  @ApiProperty({ enum: Object.values(WAREHOUSE_TYPE) }) @IsEnum(WAREHOUSE_TYPE) type!: string;
  @ApiProperty({ type: WarehouseAddressHttpDTO }) @Type(() => WarehouseAddressHttpDTO) address!: WarehouseAddressHttpDTO;
  @ApiPropertyOptional() @IsOptional() @IsString() contactName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactEmail?: string;
  @ApiProperty() @IsNumber() @Min(1) @Type(() => Number) capacityM3!: number;
  @ApiProperty() @IsNumber() @Min(1) @Type(() => Number) capacityKg!: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) @Type(() => Number) maxSkus?: number;
  @ApiProperty() @IsString() zone!: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) operatingHoursStart?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) operatingHoursEnd?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() timezone?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isDefault?: boolean;
}

export class UpdateWarehouseHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactEmail?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) operatingHoursStart?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) operatingHoursEnd?: number;
}

export class DeactivateWarehouseHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class MaintenanceWarehouseHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class ListWarehousesHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() zone?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() hasCapacity?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() sortBy?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sortDir?: 'asc' | 'desc';
}
