/**
 * Lock Account HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const LOCK_REASONS = [
  'too_many_attempts',
  'suspicious_activity',
  'manual_admin',
  'policy_violation',
  'security_breach',
] as const;

export class LockAccountHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  userId!: string;

  @ApiProperty({ enum: LOCK_REASONS, example: 'suspicious_activity' })
  @IsEnum(LOCK_REASONS)
  reason!: (typeof LOCK_REASONS)[number];

  @ApiPropertyOptional({
    example: 900,
    description: 'Lock duration in seconds (default: 900)',
    minimum: 60,
    maximum: 2592000,
  })
  @IsOptional()
  @IsInt()
  @Min(60)
  @Max(30 * 24 * 3600)
  durationSeconds?: number;
}
