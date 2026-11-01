/**
 * Register Response DTO
 * @module identity-service/interfaces/dtos/responses/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthPublicHttpResponseDTO } from './auth-public.response.dto.js';
import { AuthSessionPublicHttpResponseDTO } from '../session/session-public.response.dto.js';
import { AuthTokenHttpResponseDTO } from '../token/token.response.dto.js';

export class RegisterHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;

  @ApiProperty({ type: AuthPublicHttpResponseDTO })
  readonly user!: AuthPublicHttpResponseDTO;

  @ApiPropertyOptional({ type: AuthSessionPublicHttpResponseDTO })
  readonly session?: AuthSessionPublicHttpResponseDTO;

  @ApiPropertyOptional({ type: AuthTokenHttpResponseDTO })
  readonly tokens?: AuthTokenHttpResponseDTO;

  @ApiProperty({ example: true })
  readonly requiresVerification!: boolean;

  @ApiPropertyOptional({ enum: ['email', 'phone', 'both'], example: 'email' })
  readonly verificationChannel?: 'email' | 'phone' | 'both';

  @ApiProperty({ example: 'Registration successful. Please verify your email.' })
  readonly message!: string;
}
