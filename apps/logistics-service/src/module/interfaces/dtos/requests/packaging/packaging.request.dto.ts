/**
 * Packaging HTTP Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsInt, IsNumber, IsOptional, IsString,
  Length, Min, Max, MinLength, MaxLength,
} from 'class-validator';

const PACKAGING_TYPE_VALUES = [
  'box', 'envelope', 'bag', 'tube', 'pallet', 'crate', 'bubble_wrap', 'custom',
] as const;

const PACKAGING_MATERIAL_VALUES = [
  'cardboard', 'plastic', 'paper', 'wood', 'metal', 'fabric', 'foam', 'mixed',
] as const;

export class CreatePackagingHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150)
  readonly name!: string;

  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50)
  readonly code!: string;

  @ApiProperty({ enum: PACKAGING_TYPE_VALUES }) @IsString()
  readonly type!: string;

  @ApiProperty({ enum: PACKAGING_MATERIAL_VALUES }) @IsString()
  readonly material!: string;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly lengthCm!: number;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly widthCm!: number;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly heightCm!: number;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxWeightKg!: number;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly cost?: number;

  @ApiPropertyOptional({ minLength: 3, maxLength: 3 }) @IsOptional() @IsString() @Length(3, 3)
  readonly currency?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly imageUrl?: string;

  @ApiProperty() @IsBoolean()
  readonly isFragile!: boolean;

  @ApiProperty() @IsBoolean()
  readonly isTemperatureControlled!: boolean;

  @ApiProperty() @IsBoolean()
  readonly isRecyclable!: boolean;

  @ApiProperty({ minimum: 0 }) @IsInt() @Min(0)
  readonly stock!: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isDefault?: boolean;
}

export class UpdatePackagingHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly cost?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly imageUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isFragile?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isTemperatureControlled?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  readonly isRecyclable?: boolean;
}

export class UpdateSizeHttpDTO {
  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly lengthCm!: number;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly widthCm!: number;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly heightCm!: number;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 3 }) @Min(0)
  readonly maxWeightKg!: number;
}

export class AddStockHttpDTO {
  @ApiProperty({ minimum: 1 }) @IsInt() @Min(1)
  readonly quantity!: number;
}

export class ConsumeStockHttpDTO {
  @ApiProperty({ minimum: 1 }) @IsInt() @Min(1)
  readonly quantity!: number;
}

export class PackagingReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

export class ListPackagingsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 }) @IsOptional() @IsInt() @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 }) @IsOptional() @IsInt() @Min(1) @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly type?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly material?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'name', 'cost'] }) @IsOptional() @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] }) @IsOptional() @IsString()
  readonly sortDir?: string;
}
