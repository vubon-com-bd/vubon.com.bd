/**
 * Update Profile HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

const GENDERS = ['male', 'female', 'other', 'prefer_not_to_say'] as const;

export class UpdateProfileHttpDTO {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  displayName?: string;

  @ApiPropertyOptional({ example: 'Full-stack developer from Dhaka.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @ApiPropertyOptional({ example: 'https://cdn.vubon.com.bd/avatar.jpg' })
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'https://cdn.vubon.com.bd/cover.jpg' })
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  coverUrl?: string;

  @ApiPropertyOptional({ example: '1990-05-15' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ enum: GENDERS })
  @IsOptional()
  @IsEnum(GENDERS)
  gender?: (typeof GENDERS)[number];

  @ApiPropertyOptional({ example: 'https://johndoe.dev' })
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  website?: string;
}
