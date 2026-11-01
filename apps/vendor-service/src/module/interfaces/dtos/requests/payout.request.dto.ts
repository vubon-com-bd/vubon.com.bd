/**
 * Payout HTTP Request DTOs
 * @module vendor-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsNumber, IsOptional, IsString, IsUUID,
  MaxLength, Min,
} from 'class-validator';

export const PAYOUT_METHOD_VALUES = [
  'bank_transfer', 'mobile_banking', 'paypal', 'stripe',
  'wise', 'payoneer', 'cash', 'cheque',
] as const;

export class RequestPayoutHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly vendorId!: string;

  @ApiProperty({ example: 5000.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(100)
  readonly amount!: number;

  @ApiProperty({ enum: PAYOUT_METHOD_VALUES })
  @IsEnum(PAYOUT_METHOD_VALUES)
  readonly method!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly bankAccountId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  readonly notes?: string;
}

export class ApprovePayoutHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly notes?: string;
}

export class RejectPayoutHttpDTO {
  @ApiProperty({ example: 'Bank account unverified' })
  @IsString()
  @MaxLength(500)
  readonly reason!: string;
}

export class ProcessPayoutHttpDTO {
  @ApiProperty({ example: 'txn_abc123' })
  @IsString()
  @MaxLength(255)
  readonly transactionId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly notes?: string;
}
