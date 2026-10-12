import { IsString, IsOptional, IsNumber, IsEnum, Min, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DRIVER_TYPE, DRIVER_LICENSE_TYPE, DRIVER_STATUS } from '@vubon/shared-constants/logistics';

export class RegisterDriverHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) name!: string;
  @ApiProperty() @IsString() @MaxLength(30) phone!: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiProperty({ enum: Object.values(DRIVER_TYPE) }) @IsEnum(DRIVER_TYPE) type!: string;
  @ApiProperty() @IsString() @MaxLength(50) licenseNumber!: string;
  @ApiProperty({ enum: Object.values(DRIVER_LICENSE_TYPE) }) @IsEnum(DRIVER_LICENSE_TYPE) licenseType!: string;
  @ApiProperty() @IsString() licenseExpiresAt!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dateOfBirth?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) cashLimit?: number;
}

export class UpdateDriverHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) name?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
}

export class SetDriverStatusHttpDTO {
  @ApiProperty({ enum: Object.values(DRIVER_STATUS) }) @IsEnum(DRIVER_STATUS) status!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

export class AssignDriverVehicleHttpDTO {
  @ApiProperty() @IsString() vehicleId!: string;
}

export class DriverCashHttpDTO {
  @ApiProperty() @IsNumber() @Min(0.01) @Type(() => Number) amount!: number;
}

export class ListDriversHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() warehouseId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleId?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
