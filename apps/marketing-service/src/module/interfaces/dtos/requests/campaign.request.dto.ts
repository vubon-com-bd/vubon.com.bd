import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum CampaignTypeEnum {
  EMAIL = 'email',
  SMS = 'sms',
  SOCIAL = 'social',
  SEARCH = 'search',
  DISPLAY = 'display',
  CONTENT = 'content',
  EVENT = 'event',
  MULTI_CHANNEL = 'multi_channel',
}

export enum CampaignChannelEnum {
  EMAIL = 'email',
  SMS = 'sms',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  TIKTOK = 'tiktok',
  GOOGLE = 'google',
  YOUTUBE = 'youtube',
  PUSH = 'push',
}

export class CreateCampaignRequestDTO {
  @ApiProperty({ example: 'Summer Sale 2026', minLength: 3, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  name!: string;

  @ApiProperty({ enum: CampaignTypeEnum, example: CampaignTypeEnum.EMAIL })
  @IsEnum(CampaignTypeEnum)
  type!: string;

  @ApiProperty({ enum: CampaignChannelEnum, example: CampaignChannelEnum.EMAIL })
  @IsEnum(CampaignChannelEnum)
  channel!: string;

  @ApiPropertyOptional({ example: '2026-06-01T00:00:00.000Z' })
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-06-30T23:59:59.000Z' })
  @IsOptional()
  @IsISO8601()
  endDate?: string;
}

export class UpdateCampaignRequestDTO {
  @ApiPropertyOptional({ minLength: 3, maxLength: 200 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({ enum: CampaignTypeEnum })
  @IsOptional()
  @IsEnum(CampaignTypeEnum)
  type?: string;

  @ApiPropertyOptional({ enum: CampaignChannelEnum })
  @IsOptional()
  @IsEnum(CampaignChannelEnum)
  channel?: string;
}

export class LaunchCampaignRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  campaignId!: string;
}

export class CampaignIdRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  id!: string;
}
