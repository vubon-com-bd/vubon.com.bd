/**
 * SocialRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const PROVIDERS = ['google', 'facebook', 'apple', 'twitter', 'github', 'linkedin', 'tiktok', 'instagram'];

export class SocialLoginRequestDTO {
  @ApiProperty({ enum: PROVIDERS })
  provider!: string;

  @ApiPropertyOptional({ format: 'url' })
  redirectUri?: string;

  @ApiPropertyOptional()
  deviceId?: string;
}

export class SocialCallbackRequestDTO {
  @ApiProperty({ enum: PROVIDERS })
  provider!: string;

  @ApiProperty({ minLength: 1, maxLength: 4096 })
  code!: string;

  @ApiProperty({ minLength: 1, maxLength: 512 })
  state!: string;

  @ApiPropertyOptional()
  deviceId?: string;
}

export class LinkSocialRequestDTO {
  @ApiProperty({ enum: PROVIDERS })
  provider!: string;

  @ApiProperty({ minLength: 8, maxLength: 4096 })
  accessToken!: string;

  @ApiProperty({ minLength: 1, maxLength: 255 })
  providerUserId!: string;

  @ApiPropertyOptional({ type: [String] })
  scopes?: string[];
}

export class UnlinkSocialRequestDTO {
  @ApiProperty({ enum: PROVIDERS })
  provider!: string;

  @ApiProperty({ minLength: 1, maxLength: 128 })
  password!: string;
}
