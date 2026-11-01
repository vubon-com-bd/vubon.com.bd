/**
 * Revoke Permission HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RevokePermissionHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  userId!: string;

  @ApiProperty({ example: 'auth:manage_sessions' })
  @IsString()
  @MinLength(3)
  @MaxLength(128)
  permission!: string;

  @ApiPropertyOptional({ example: 'No longer needed' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
