import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum SocialPlatformEnum {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  TIKTOK = 'tiktok',
  YOUTUBE = 'youtube',
  PINTEREST = 'pinterest',
  THREADS = 'threads',
}

export class CreateSocialPostRequestDTO {
  @ApiProperty({ enum: SocialPlatformEnum, example: SocialPlatformEnum.FACEBOOK })
  @IsEnum(SocialPlatformEnum)
  platform!: string;

  @ApiProperty({ example: 'Check out our new arrivals!' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class ScheduleSocialPostRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  postId!: string;

  @ApiProperty({ example: '2026-07-01T10:00:00.000Z' })
  @IsString()
  scheduledAt!: string;
}

export class PublishSocialPostRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  postId!: string;
}
