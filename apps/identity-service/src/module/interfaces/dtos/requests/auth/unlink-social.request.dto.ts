/**
 * Unlink Social HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

const SOCIAL_PROVIDERS = [
  'google',
  'facebook',
  'apple',
  'github',
  'linkedin',
  'twitter',
  'microsoft',
] as const;

export class UnlinkSocialHttpDTO {
  @ApiProperty({ enum: SOCIAL_PROVIDERS, example: 'google' })
  @IsEnum(SOCIAL_PROVIDERS)
  provider!: (typeof SOCIAL_PROVIDERS)[number];
}
