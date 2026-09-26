/**
 * LockRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const LOCK_REASONS = ['too_many_attempts', 'suspicious_activity', 'admin_action', 'payment_fraud', 'policy_violation', 'security_incident'];

export class LockAccountRequestDTO {
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty({ enum: LOCK_REASONS })
  reason!: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 60 * 24 * 365 })
  durationMinutes?: number;

  @ApiPropertyOptional({ maxLength: 500 })
  note?: string;
}

export class UnlockAccountRequestDTO {
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiPropertyOptional({ maxLength: 500 })
  note?: string;
}
