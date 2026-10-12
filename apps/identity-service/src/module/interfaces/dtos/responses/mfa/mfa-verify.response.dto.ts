/**
 * MFA Verify Response DTO
 * @module identity-service/interfaces/dtos/responses/mfa
 */
import { ApiProperty } from '@nestjs/swagger';

export class MfaVerifyHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: true }) readonly verified!: boolean;
  @ApiProperty({ example: 'totp' }) readonly method!: string;
  @ApiProperty({ example: false }) readonly usedBackupCode!: boolean;
  @ApiProperty({ example: 9 }) readonly remainingBackupCodes!: number;
  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  readonly verifiedAt!: string;
}
