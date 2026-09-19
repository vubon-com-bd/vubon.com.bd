import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { BiometricResponseDTO } from '../../../application/dtos/responses/biometric-response.dto';

export class BiometricResponseDTO_ implements BiometricResponseDTO {
  @ApiProperty()
  enabled!: boolean;

  @ApiPropertyOptional()
  biometricId?: string;

  @ApiPropertyOptional()
  enrolledAt?: string;
}
