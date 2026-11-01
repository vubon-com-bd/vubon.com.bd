/**
 * Assign Role HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsDateString, MaxLength, MinLength } from 'class-validator';

const USER_ROLES = [
  'super_admin', 'admin', 'moderator', 'vendor', 'customer',
  'guest', 'support_agent', 'logistics_manager',
] as const;

export class AssignRoleHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  userId!: string;

  @ApiProperty({ enum: USER_ROLES, example: 'moderator' })
  @IsEnum(USER_ROLES)
  role!: (typeof USER_ROLES)[number];

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
