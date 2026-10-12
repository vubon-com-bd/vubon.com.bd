/**
 * Vehicle HTTP Request DTOs
 */
import { IsString, IsOptional, IsNumber, IsEnum, Min, Max, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VEHICLE_TYPE, VEHICLE_FUEL_TYPE, VEHICLE_STATUS } from '@vubon/shared-constants/logistics';

export class RegisterVehicleHttpDTO {
  @ApiProperty() @IsString() @MinLength(1) @MaxLength(30) registrationNumber!: string;
  @ApiProperty({ enum: Object.values(VEHICLE_TYPE) }) @IsEnum(VEHICLE_TYPE) type!: string;
  @ApiProperty({ enum: Object.values(VEHICLE_FUEL_TYPE) }) @IsEnum(VEHICLE_FUEL_TYPE) fuelType!: string;
  @ApiProperty() @IsString() @MaxLength(50) make!: string;
  @ApiProperty() @IsString() @MaxLength(50) model!: string;
  @ApiProperty() @IsNumber() @Min(1900) @Max(2100) @Type(() => Number) year!: number;
  @ApiPropertyOptional() @IsOptional() @IsString() color?: string;
  @ApiProperty() @IsNumber() @Min(0.001) @Type(() => Number) maxWeightKg!: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) maxVolumeM3?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) @Type(() => Number) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) mileageKm?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() insuranceExpiresAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() registrationExpiresAt?: string;
}

export class UpdateVehicleHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) mileageKm?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() color?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() insuranceExpiresAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() registrationExpiresAt?: string;
}

export class SetVehicleStatusHttpDTO {
  @ApiProperty({ enum: Object.values(VEHICLE_STATUS) }) @IsEnum(VEHICLE_STATUS) status!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class AssignVehicleDriverHttpDTO {
  @ApiProperty() @IsString() driverId!: string;
}

export class UpdateVehicleMileageHttpDTO {
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) mileageKm!: number;
}

export class ListVehiclesHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() fuelType?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
