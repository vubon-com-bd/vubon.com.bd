/**
 * Verify Biometric HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyBiometricHttpDTO {
  @ApiProperty({ example: 'device-fp-abc123' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId!: string;

  @ApiProperty({
    example: 'base64-encoded-challenge-response',
    description: 'Signed challenge response',
  })
  @IsString()
  @MinLength(16)
  @MaxLength(2048)
  challengeResponse!: string;
}
