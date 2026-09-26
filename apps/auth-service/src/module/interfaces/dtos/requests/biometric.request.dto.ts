/**
 * BiometricRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty } from '@nestjs/swagger';

export class EnableBiometricRequestDTO {
  @ApiProperty({ enum: ['fingerprint', 'face', 'voice', 'iris'] })
  kind!: 'fingerprint' | 'face' | 'voice' | 'iris';

  @ApiProperty({ minLength: 8, maxLength: 256 })
  biometricId!: string;

  @ApiProperty({ minLength: 1, maxLength: 128 })
  deviceId!: string;

  @ApiProperty({ minLength: 1, maxLength: 128 })
  password!: string;
}

export class DisableBiometricRequestDTO {
  @ApiProperty({ minLength: 8, maxLength: 256 })
  biometricId!: string;

  @ApiProperty({ minLength: 1, maxLength: 128 })
  password!: string;
}

export class VerifyBiometricRequestDTO {
  @ApiProperty({ minLength: 8, maxLength: 256 })
  biometricId!: string;

  @ApiProperty({ minLength: 8, maxLength: 2048 })
  challenge!: string;

  @ApiProperty({ minLength: 1, maxLength: 128 })
  deviceId!: string;
}
