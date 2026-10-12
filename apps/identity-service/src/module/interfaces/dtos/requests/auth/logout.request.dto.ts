/**
 * Logout HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class LogoutHttpDTO {
  @ApiPropertyOptional({
    example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    description: 'Session ID to logout. If omitted, current session is used.',
  })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({
    example: false,
    default: false,
    description: 'If true, revoke all sessions of this user',
  })
  @IsOptional()
  @IsBoolean()
  allDevices?: boolean;

  @ApiPropertyOptional({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  refreshToken?: string;
}
