/**
 * Suspend User HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SuspendUserHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  userId!: string;

  @ApiProperty({ example: 'Violation of community guidelines' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  reason!: string;

  @ApiPropertyOptional({
    example: 604800,
    description: 'Duration in seconds (default: indefinite)',
    minimum: 60,
    maximum: 31536000,
  })
  @IsOptional()
  @IsInt()
  @Min(60)
  @Max(365 * 24 * 3600)
  durationSeconds?: number;
}
