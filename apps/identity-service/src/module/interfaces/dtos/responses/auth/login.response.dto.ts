/**
 * Login Response DTO
 * @module identity-service/interfaces/dtos/responses/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthPublicHttpResponseDTO } from './auth-public.response.dto.js';
import { AuthSessionPublicHttpResponseDTO } from '../session/session-public.response.dto.js';
import { AuthTokenHttpResponseDTO } from '../token/token.response.dto.js';

export class LoginHttpResponseDTO {
  @ApiProperty({ example: true, default: true })
  readonly success!: true;

  @ApiProperty({ type: AuthPublicHttpResponseDTO })
  readonly user!: AuthPublicHttpResponseDTO;

  @ApiProperty({ type: AuthSessionPublicHttpResponseDTO })
  readonly session!: AuthSessionPublicHttpResponseDTO;

  @ApiProperty({ type: AuthTokenHttpResponseDTO })
  readonly tokens!: AuthTokenHttpResponseDTO;

  @ApiPropertyOptional({ example: false })
  readonly requiresMfa?: boolean;

  @ApiPropertyOptional({ example: false })
  readonly requiresVerification?: boolean;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly challengeId?: string;

  @ApiPropertyOptional({ example: ['totp', 'sms'] })
  readonly mfaMethods?: readonly string[];
}
