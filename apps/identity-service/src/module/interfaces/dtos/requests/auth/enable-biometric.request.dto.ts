/**
 * Enable Biometric HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

const BIOMETRIC_TYPES = ['fingerprint', 'face_id', 'voice', 'iris', 'palm'] as const;

export class EnableBiometricHttpDTO {
  @ApiProperty({ enum: BIOMETRIC_TYPES, example: 'face_id' })
  @IsEnum(BIOMETRIC_TYPES)
  type!: (typeof BIOMETRIC_TYPES)[number];

  @ApiProperty({
    example: 'a1b2c3d4e5f6...',
    description: 'Public key hash from device',
  })
  @IsString()
  @MinLength(32)
  @MaxLength(512)
  publicKeyHash!: string;

  @ApiProperty({ example: 'device-fp-abc123' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  deviceId!: string;
}
