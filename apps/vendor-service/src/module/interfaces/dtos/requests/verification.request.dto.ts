/**
 * Verification HTTP Request DTOs
 * @module vendor-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export const VERIFICATION_TYPE_VALUES = [
  'email', 'phone', 'business_license', 'tax_id',
  'bank_account', 'identity', 'address', 'website',
] as const;

export class SubmitVerificationHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly vendorId!: string;

  @ApiProperty({ enum: VERIFICATION_TYPE_VALUES })
  @IsEnum(VERIFICATION_TYPE_VALUES)
  readonly type!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly referenceId?: string;
}

export class ReverifyHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly referenceId?: string;
}
