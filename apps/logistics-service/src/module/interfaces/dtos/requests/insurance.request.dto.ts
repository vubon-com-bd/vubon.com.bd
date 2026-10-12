import { IsString, IsOptional, IsArray, IsEnum, IsNumber, Min, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { INSURANCE_TYPE, INSURANCE_COVERAGE } from '@vubon/shared-constants/logistics';

export class PurchaseInsuranceHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() shipmentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiProperty({ enum: Object.values(INSURANCE_TYPE) }) @IsEnum(INSURANCE_TYPE) type!: string;
  @ApiProperty({ enum: Object.values(INSURANCE_COVERAGE), isArray: true }) @IsArray() coverages!: string[];
  @ApiProperty() @IsNumber() @Min(0) @Type(() => Number) declaredValue!: number;
  @ApiProperty() @IsString() @MaxLength(3) currency!: string;
  @ApiProperty() @IsString() startsAt!: string;
  @ApiProperty() @IsString() expiresAt!: string;
}
export class FileClaimHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
  @ApiProperty() @IsNumber() @Min(0.01) @Type(() => Number) amount!: number;
  @ApiProperty() @IsString() @MaxLength(3) currency!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(5000) description?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() images?: string[];
}
export class ApproveClaimHttpDTO {
  @ApiProperty() @IsNumber() @Min(0.01) @Type(() => Number) approvedAmount!: number;
}
export class RejectClaimHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}
export class InsuranceReasonHttpDTO {
  @ApiProperty() @IsString() @MinLength(2) @MaxLength(500) reason!: string;
}
export class ListInsurancesHttpQueryDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() shipmentId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() orderId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) limit?: number;
}
