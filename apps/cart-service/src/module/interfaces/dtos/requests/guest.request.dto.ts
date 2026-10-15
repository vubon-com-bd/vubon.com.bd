/**
 * Guest Cart HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';

const MERGE_STRATEGY_VALUES = [
  'sum_quantity',
  'max_quantity',
  'keep_latest',
  'keep_existing',
  'replace',
];

// ─── Create Guest Cart ──────────────────────
export class CreateGuestCartHttpDTO {
  @ApiPropertyOptional({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly currency?: string;

  @ApiPropertyOptional({ example: 'sess_abc123' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly sessionId?: string;

  @ApiPropertyOptional({ example: 168, minimum: 1, maximum: 720 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(720)
  readonly ttlHours?: number;
}

// ─── Merge Guest Cart ───────────────────────
export class MergeGuestCartHttpDTO {
  @ApiProperty({ example: 'abc123xyz_guest_token_32chars_min' })
  @IsString()
  @MinLength(16)
  @MaxLength(128)
  readonly guestToken!: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly userId!: string;

  @ApiPropertyOptional({ enum: MERGE_STRATEGY_VALUES, default: 'sum_quantity' })
  @IsOptional()
  @IsEnum(MERGE_STRATEGY_VALUES)
  readonly strategy?: string;
}

// ─── Guest Token Header ─────────────────────
export class GuestTokenHttpDTO {
  @ApiPropertyOptional({ example: 'abc123xyz_guest_token_32chars_min' })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(128)
  readonly guestToken?: string;
}
