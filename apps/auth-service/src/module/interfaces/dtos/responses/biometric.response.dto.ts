/**
 * BiometricResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BiometricResponseDTO {
  @ApiProperty() enabled!: boolean;
  @ApiPropertyOptional() biometricId?: string;
  @ApiPropertyOptional({ enum: ['fingerprint', 'face', 'voice', 'iris'] })
  kind?: string;
  @ApiPropertyOptional() enrolledAt?: string;
  @ApiPropertyOptional() deviceId?: string;
}
