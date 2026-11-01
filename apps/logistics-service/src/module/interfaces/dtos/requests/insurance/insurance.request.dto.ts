/**
 * Insurance HTTP Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID,
  Length, Min, MinLength, MaxLength,
} from 'class-validator';

export class CreateInsuranceHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly shipmentId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly userId?: string;

  @ApiProperty() @IsString() @MinLength(2) @MaxLength(30)
  readonly type!: string;

  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true })
  readonly coverages!: readonly string[];

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly declaredValue!: number;

  @ApiProperty({ minLength: 3, maxLength: 3 }) @IsString() @Length(3, 3)
  readonly currency!: string;

  @ApiProperty() @IsDateString()
  readonly startsAt!: string;

  @ApiProperty() @IsDateString()
  readonly expiresAt!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150)
  readonly provider?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000)
  readonly notes?: string;
}

export class SubmitClaimHttpDTO {
  @ApiProperty() @IsUUID()
  readonly claimId!: string;

  @ApiProperty() @IsString() @MinLength(2) @MaxLength(50)
  readonly claimNumber!: string;

  @ApiProperty() @IsString() @MinLength(3) @MaxLength(500)
  readonly reason!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(2000)
  readonly description?: string;

  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true })
  readonly images?: readonly string[];

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly amount!: number;
}

export class ReviewClaimHttpDTO {
  @ApiProperty() @IsUUID()
  readonly claimId!: string;
}

export class ApproveClaimHttpDTO {
  @ApiProperty() @IsUUID()
  readonly claimId!: string;

  @ApiProperty() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0)
  readonly approvedAmount!: number;
}

export class RejectClaimHttpDTO {
  @ApiProperty() @IsUUID()
  readonly claimId!: string;

  @ApiProperty() @IsString() @MinLength(3) @MaxLength(500)
  readonly reason!: string;
}

export class PayClaimHttpDTO {
  @ApiProperty() @IsUUID()
  readonly claimId!: string;
}

export class InsuranceReasonHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500)
  readonly reason?: string;
}

export class ListInsurancesHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 }) @IsOptional() @IsString()
  readonly page?: string;

  @ApiPropertyOptional({ example: 20 }) @IsOptional() @IsString()
  readonly limit?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly status?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  readonly type?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID()
  readonly shipmentId?: string;
}
