/**
 * Account Lock Response DTO
 * @module identity-service/interfaces/dtos/responses/account-lock
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AccountLockHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty({ example: true }) readonly isLocked!: boolean;
  @ApiPropertyOptional() readonly reason?: string;
  @ApiPropertyOptional() readonly lockedAt?: string;
  @ApiPropertyOptional() readonly lockedUntil?: string;
  @ApiPropertyOptional({ example: 900 })
  readonly remainingSeconds?: number;

  @ApiPropertyOptional({ example: 5 })
  readonly attemptCount?: number;
}
