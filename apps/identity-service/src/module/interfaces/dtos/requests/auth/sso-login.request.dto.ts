/**
 * SSO Login HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class SsoLoginHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MaxLength(128)
  providerId!: string;

  @ApiPropertyOptional({ example: 'relay-state-token' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  relayState?: string;

  @ApiPropertyOptional({ example: 'https://app.vubon.com.bd/dashboard' })
  @IsOptional()
  @IsUrl()
  returnUrl?: string;
}
