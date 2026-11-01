/**
 * SSO Login Response DTO
 * @module identity-service/interfaces/dtos/responses/sso
 */
import { ApiProperty } from '@nestjs/swagger';
import { AuthPublicHttpResponseDTO } from '../auth/auth-public.response.dto.js';
import { AuthSessionPublicHttpResponseDTO } from '../session/session-public.response.dto.js';
import { AuthTokenHttpResponseDTO } from '../token/token.response.dto.js';

export class SsoLoginHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ type: AuthPublicHttpResponseDTO })
  readonly user!: AuthPublicHttpResponseDTO;
  @ApiProperty({ type: AuthSessionPublicHttpResponseDTO })
  readonly session!: AuthSessionPublicHttpResponseDTO;
  @ApiProperty({ type: AuthTokenHttpResponseDTO })
  readonly tokens!: AuthTokenHttpResponseDTO;
  @ApiProperty({ example: 'saml' }) readonly provider!: string;
  @ApiProperty({ example: false }) readonly isNewUser!: boolean;
}
