/**
 * Login HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginHttpDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email, phone, or username identifier',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  identifier!: string;

  @ApiProperty({ example: 'StrongP@ss123', minLength: 1, maxLength: 128 })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  password!: string;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;

  @ApiPropertyOptional({
    example: 'device-fp-abc123',
    description: 'Device fingerprint for trusted device',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceId?: string;

  @ApiPropertyOptional({
    example: '123456',
    description: 'MFA code if MFA is enabled',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'MFA code must be 6 digits' })
  mfaCode?: string;
}
