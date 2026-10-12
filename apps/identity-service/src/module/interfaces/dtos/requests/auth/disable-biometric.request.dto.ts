/**
 * Disable Biometric HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class DisableBiometricHttpDTO {
  @ApiProperty({ example: 'device-fp-abc123' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId!: string;
}
