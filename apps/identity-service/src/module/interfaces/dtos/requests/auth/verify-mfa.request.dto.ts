/**
 * Verify MFA HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

const MFA_METHODS = ['totp', 'sms', 'email', 'push', 'webauthn', 'backup_code'] as const;

export class VerifyMfaHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  challengeId!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'MFA code must be 6 digits' })
  code!: string;

  @ApiProperty({ enum: MFA_METHODS, example: 'totp' })
  @IsEnum(MFA_METHODS)
  method!: (typeof MFA_METHODS)[number];

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  rememberDevice?: boolean;
}
