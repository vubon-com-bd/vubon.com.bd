/**
 * User Request DTOs
 * @module user-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { USER_TYPE } from '@vubon/shared-constants/user';
import { VALIDATION, REGEX } from '@vubon/shared-constants/common';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(VALIDATION.EMAIL_MAX_LENGTH)
  email!: string;

  @ApiProperty({ example: 'StrongPass123!' })
  @IsString()
  @MinLength(VALIDATION.PASSWORD_MIN_LENGTH)
  @MaxLength(VALIDATION.PASSWORD_MAX_LENGTH)
  password!: string;

  @ApiProperty({ enum: Object.values(USER_TYPE), example: 'individual' })
  @IsEnum(Object.values(USER_TYPE) as string[])
  type!: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'john_doe' })
  @IsOptional()
  @IsString()
  @MaxLength(VALIDATION.USERNAME_MAX_LENGTH)
  username?: string;

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @MaxLength(VALIDATION.NAME_MAX_LENGTH)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(VALIDATION.NAME_MAX_LENGTH)
  lastName?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  sendVerificationEmail?: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  acceptTerms!: boolean;
}

export class UpdateUserRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(VALIDATION.USERNAME_MAX_LENGTH)
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;
}

export class SuspendUserRequestDto {
  @ApiProperty({ example: 'Violated community guidelines' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;

  @ApiPropertyOptional({ example: '2026-12-31T00:00:00.000Z' })
  @IsOptional()
  @IsString()
  suspendedUntil?: string;
}
