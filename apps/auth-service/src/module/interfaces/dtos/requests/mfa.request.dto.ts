/**
 * MfaRequestDTO — enable/disable/verify MFA
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnableMfaRequestDTO {
  @ApiProperty({ enum: ['totp', 'sms', 'email', 'webauthn', 'push'] })
  type!: 'totp' | 'sms' | 'email' | 'webauthn' | 'push';

  @ApiProperty({ minLength: 1, maxLength: 128 })
  password!: string;

  @ApiPropertyOptional()
  phone?: string;
}

export class DisableMfaRequestDTO {
  @ApiProperty({ minLength: 1, maxLength: 128 })
  password!: string;

  @ApiPropertyOptional({ example: '123456' })
  code?: string;
}

export class VerifyMfaRequestDTO {
  @ApiProperty({ example: 'challenge-uuid' })
  challengeId!: string;

  @ApiProperty({ example: '123456', pattern: '^\\d{6}$' })
  code!: string;

  @ApiPropertyOptional({ default: false })
  trustDevice?: boolean;
}
