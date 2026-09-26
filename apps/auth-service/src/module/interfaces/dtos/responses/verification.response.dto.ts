/**
 * VerificationResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerificationResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() type!: string;
  @ApiProperty({ enum: ['pending', 'verified', 'rejected', 'expired'] })
  status!: string;
  @ApiProperty() expiresAt!: string;
  @ApiProperty() createdAt!: string;
  @ApiPropertyOptional() completedAt?: string;
}
