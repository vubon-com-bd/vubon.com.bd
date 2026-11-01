/**
 * Create User HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const USER_TYPES = ['individual', 'business', 'vendor', 'admin', 'staff', 'guest'] as const;
const USER_ROLES = [
  'super_admin', 'admin', 'moderator', 'vendor', 'customer',
  'guest', 'support_agent', 'logistics_manager',
] as const;

export class CreateUserHttpDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  @Matches(/^(\+880|880|0)1[3-9]\d{8}$/)
  phone?: string;

  @ApiPropertyOptional({ example: 'john_doe' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,30}$/)
  username?: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message: 'Password too weak',
  })
  password!: string;

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

  @ApiProperty({ enum: USER_TYPES, example: 'individual' })
  @IsEnum(USER_TYPES)
  type!: (typeof USER_TYPES)[number];

  @ApiPropertyOptional({ enum: USER_ROLES, example: 'customer' })
  @IsOptional()
  @IsEnum(USER_ROLES)
  role?: (typeof USER_ROLES)[number];

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  sendVerificationEmail?: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  acceptTerms!: boolean;
}
