/**
 * Enable MFA HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const MFA_METHODS = ['totp', 'sms', 'email', 'push', 'webauthn', 'backup_code'] as const;

export class EnableMfaHttpDTO {
  @ApiProperty({ enum: MFA_METHODS, example: 'totp' })
  @IsEnum(MFA_METHODS)
  method!: (typeof MFA_METHODS)[number];

  @ApiPropertyOptional({
    example: '123456',
    description: 'Verification code to enable MFA',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Code must be 6 digits' })
  code?: string;
}

export class DisableMfaHttpDTO {
  @ApiProperty({ example: 'CurrentPassword123!' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  password!: string;

  @ApiPropertyOptional({
    example: '123456',
    description: 'Current MFA code for verification',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Code must be 6 digits' })
  code?: string;
}
