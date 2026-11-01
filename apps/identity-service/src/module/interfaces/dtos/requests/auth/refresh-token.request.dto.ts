/**
 * Refresh Token HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RefreshTokenHttpDTO {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'Valid refresh token',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  refreshToken!: string;

  @ApiPropertyOptional({ example: 'device-fp-abc123' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceId?: string;
}
