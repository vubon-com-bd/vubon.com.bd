/**
 * MFA Setup Response DTO
 * @module identity-service/interfaces/dtos/responses/mfa
 */
import { ApiProperty } from '@nestjs/swagger';

export class MfaSetupHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: 'totp' }) readonly method!: string;
  @ApiProperty({ example: 'JBSWY3DPEHPK3PXP' }) readonly secret!: string;
  @ApiProperty({ example: 'otpauth://totp/Vubon:user@example.com?secret=...' })
  readonly otpauthUrl!: string;

  @ApiProperty({ example: 'data:image/png;base64,...' })
  readonly qrCodeUrl!: string;

  @ApiProperty({ example: ['ABCD1234', 'EFGH5678'] })
  readonly backupCodes!: readonly string[];

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  readonly setupAt!: string;
}
