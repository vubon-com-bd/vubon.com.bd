/**
 * Register HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterHttpDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  @Matches(/^(\+880|880|0)1[3-9]\d{8}$/, {
    message: 'Invalid Bangladeshi phone number',
  })
  phone?: string;

  @ApiPropertyOptional({ example: 'john_doe' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/, {
    message: 'Username must be 3-30 alphanumeric or underscore',
  })
  username?: string;

  @ApiProperty({
    example: 'StrongP@ss123',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      'Password must contain uppercase, lowercase, number, and special character',
  })
  password!: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  @IsString()
  @MinLength(1)
  confirmPassword!: string;

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

  @ApiProperty({ example: true, description: 'Must accept terms' })
  @IsBoolean()
  acceptTerms!: boolean;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  acceptMarketing?: boolean;

  @ApiPropertyOptional({ example: 'REF123ABC' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  referralCode?: string;

  @ApiPropertyOptional({ example: 'device-fp-abc123' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceId?: string;
}
