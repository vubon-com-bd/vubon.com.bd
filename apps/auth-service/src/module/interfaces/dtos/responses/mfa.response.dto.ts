/**
 * MfaResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MfaResponseDTO {
  @ApiProperty() enabled!: boolean;
  @ApiProperty() type!: string;
  @ApiPropertyOptional() enrolledAt?: string;
  @ApiPropertyOptional() verifiedAt?: string;
  @ApiPropertyOptional({ type: [String] }) backupMethods?: string[];
}

export class MfaChallengeResponseDTO {
  @ApiProperty() challengeId!: string;
  @ApiProperty({ type: [String] }) methods!: string[];
  @ApiProperty() expiresAt!: string;
}

export class EnableMfaEnrollResponseDTO {
  @ApiProperty() secret!: string;
  @ApiProperty({ format: 'url' }) qrCodeUrl!: string;
  @ApiProperty({ type: [String] }) recoveryCodes!: string[];
}
