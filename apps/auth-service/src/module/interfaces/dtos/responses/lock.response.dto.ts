/**
 * LockResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AccountLockResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() reason!: string;
  @ApiProperty() lockedAt!: string;
  @ApiPropertyOptional() unlockAt?: string;
  @ApiPropertyOptional() unlockedAt?: string;
  @ApiPropertyOptional() unlockedBy?: string;
  @ApiProperty() isCurrentlyLocked!: boolean;
  @ApiProperty() isPermanent!: boolean;
}
