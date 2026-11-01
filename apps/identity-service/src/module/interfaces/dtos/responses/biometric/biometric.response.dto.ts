/**
 * Biometric Response DTO
 * @module identity-service/interfaces/dtos/responses/biometric
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BiometricHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: true }) readonly enabled!: boolean;
  @ApiPropertyOptional() readonly biometricId?: string;
  @ApiPropertyOptional() readonly type?: string;
  @ApiPropertyOptional() readonly message?: string;
}
