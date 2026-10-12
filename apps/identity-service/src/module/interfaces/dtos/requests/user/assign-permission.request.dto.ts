/**
 * Assign Permission HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AssignPermissionHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  userId!: string;

  @ApiProperty({ example: 'auth:manage_sessions' })
  @IsString()
  @Matches(/^[a-z_]+:[a-z_]+$|^\*$/, {
    message: 'Permission must match "resource:action" or "*"',
  })
  @MaxLength(128)
  permission!: string;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiPropertyOptional({ example: 'Temporary elevated access' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
