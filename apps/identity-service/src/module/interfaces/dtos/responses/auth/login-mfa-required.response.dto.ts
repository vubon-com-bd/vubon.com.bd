/**
 * Login MFA Required Response DTO
 * @module identity-service/interfaces/dtos/responses/auth
 */
import { ApiProperty } from '@nestjs/swagger';

export class LoginMfaRequiredHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: true }) readonly requiresMfa!: true;
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly challengeId!: string;

  @ApiProperty({ example: ['totp', 'sms'], type: [String] })
  readonly mfaMethods!: readonly string[];

  @ApiProperty({ example: '2026-01-01T00:05:00Z' })
  readonly expiresAt!: string;
}
