import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PACKAGING_TYPE, PACKAGING_MATERIAL } from '@vubon/shared-constants/logistics';

export class CreatePackagingHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(150) name!: string;
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50) code!: string;
  @ApiProperty({ enum: Object.values(PACKAGING_TYPE) }) @IsEnum(PACKAGING_TYPE) type!: string;
  @ApiProperty({ enum: Object.values(PACKAGING_MATERIAL) }) @IsEnum(PACKAGING_MATERIAL) material!: string;
  @ApiProperty() @IsNumber() @Min(0.01) @Type(() => Number) lengthCm!: number;
  @ApiProperty() @IsNumber() @Min(0.01) @Type(() => Number) widthCm!: number;
  @ApiProperty() @IsNumber() @Min(0.01) @Type(() => Number) heightCm!: number;
  @ApiProperty() @IsNumber() @Min(0.001) @Type(() => Number) maxWeightKg!: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) cost?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(3) currency?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() imageUrl?: string;
  @ApiProperty() @IsBoolean() isFragile!: boolean;
  @ApiProperty() @IsBoolean() isTemperatureControlled!: boolean;
  @ApiProperty() @IsBoolean() isRecyclable!: boolean;
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) stock!: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isDefault?: boolean;
}
export class UpdatePackagingHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) name?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Type(() => Number) cost?: number;
}
export class AdjustPackagingStockHttpDTO {
  @ApiProperty() @IsNumber() @Type(() => Number) delta!: number;
  @ApiProperty() @IsString() @MaxLength(500) reason!: string;
}
export class RestockPackagingHttpDTO {
  @ApiProperty() @IsNumber() @Min(1) @Type(() => Number) quantity!: number;
}
export class ConsumePackagingHttpDTO {
  @ApiProperty() @IsNumber() @Min(1) @Type(() => Number) quantity!: number;
}
export class SelectPackagingHttpDTO {
  @ApiProperty() @IsNumber() @Min(0.001) @Type(() => Number) weightKg!: number;
  @ApiPropertyOptional() @IsOptional() dimensions?: { lengthCm: number; widthCm: number; heightCm: number };
}
export class ListPackagingsHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() material?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
