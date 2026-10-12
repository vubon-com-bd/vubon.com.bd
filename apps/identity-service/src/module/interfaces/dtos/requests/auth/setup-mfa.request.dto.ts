/**
 * Setup MFA HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

const MFA_METHODS = ['totp', 'sms', 'email', 'push', 'webauthn'] as const;

export class SetupMfaHttpDTO {
  @ApiProperty({ enum: MFA_METHODS, example: 'totp' })
  @IsEnum(MFA_METHODS)
  method!: (typeof MFA_METHODS)[number];
}
