/**
 * Contact Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsEnum, MaxLength, MinLength } from 'class-validator';
import { USER_CONTACT_TYPE } from '@vubon/shared-constants/user';

export class AddContactRequestDto {
  @ApiProperty({ enum: Object.values(USER_CONTACT_TYPE) })
  @IsEnum(Object.values(USER_CONTACT_TYPE) as string[])
  type!: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString() @MinLength(1) @MaxLength(255)
  value!: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  label?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isPrimary?: boolean;
}

export class UpdateContactRequestDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  value?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50)
  label?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isPrimary?: boolean;
}

export class VerifyContactRequestDto {
  @ApiProperty({ example: '123456' })
  @IsString() @MinLength(4) @MaxLength(8)
  verificationCode!: string;
}
