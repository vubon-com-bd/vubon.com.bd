/**
 * Profile Request DTOs
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, IsEnum } from 'class-validator';
import { USER_PROFILE, USER_PROFILE_VISIBILITY, USER_GENDER } from '@vubon/shared-constants/user';

export class UpdateProfileRequestDto {
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(USER_PROFILE.NAME_MAX_LENGTH)
  firstName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(USER_PROFILE.NAME_MAX_LENGTH)
  lastName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(USER_PROFILE.NAME_MAX_LENGTH)
  displayName?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(USER_PROFILE.BIO_MAX_LENGTH)
  bio?: string;

  @ApiPropertyOptional() @IsOptional() @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsUrl()
  coverUrl?: string;

  @ApiPropertyOptional({ enum: Object.values(USER_GENDER) })
  @IsOptional() @IsEnum(Object.values(USER_GENDER) as string[])
  gender?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  dateOfBirth?: string;

  @ApiPropertyOptional() @IsOptional() @IsUrl()
  website?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  company?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  designation?: string;

  @ApiPropertyOptional({ enum: Object.values(USER_PROFILE_VISIBILITY) })
  @IsOptional() @IsEnum(Object.values(USER_PROFILE_VISIBILITY) as string[])
  visibility?: string;
}

export class UpdateAvatarRequestDto {
  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsUrl()
  avatarUrl!: string;
}

export class UpdateBioRequestDto {
  @ApiPropertyOptional({ example: 'Software engineer from Dhaka' })
  @IsString() @MaxLength(USER_PROFILE.BIO_MAX_LENGTH)
  bio!: string;
}

export class UpdateVisibilityRequestDto {
  @ApiPropertyOptional({ enum: Object.values(USER_PROFILE_VISIBILITY) })
  @IsEnum(Object.values(USER_PROFILE_VISIBILITY) as string[])
  visibility!: string;
}
