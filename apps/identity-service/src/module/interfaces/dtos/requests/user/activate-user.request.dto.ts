/**
 * Activate User HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ActivateUserHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  userId!: string;

  @ApiPropertyOptional({ example: 'Account restored by admin' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
