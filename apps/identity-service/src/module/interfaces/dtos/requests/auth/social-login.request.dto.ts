/**
 * Social Login HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

const SOCIAL_PROVIDERS = [
  'google',
  'facebook',
  'apple',
  'github',
  'linkedin',
  'twitter',
  'microsoft',
] as const;

export class SocialLoginHttpDTO {
  @ApiProperty({ enum: SOCIAL_PROVIDERS, example: 'google' })
  @IsEnum(SOCIAL_PROVIDERS)
  provider!: (typeof SOCIAL_PROVIDERS)[number];

  @ApiProperty({ example: 'auth-code-from-provider' })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  code!: string;

  @ApiProperty({ example: 'https://app.vubon.com.bd/auth/callback' })
  @IsUrl()
  redirectUri!: string;

  @ApiPropertyOptional({ example: 'csrf-state-token' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  state?: string;

  @ApiPropertyOptional({ example: 'device-fp-abc123' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceId?: string;
}
