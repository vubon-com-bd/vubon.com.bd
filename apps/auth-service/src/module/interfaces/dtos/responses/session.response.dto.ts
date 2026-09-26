/**
 * SessionResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SessionResponseDTO {
  @ApiProperty() sessionId!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() ipAddress!: string;
  @ApiProperty() userAgent!: string;
  @ApiPropertyOptional() deviceId?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() expiresAt!: string;
  @ApiPropertyOptional() revokedAt?: string;
  @ApiProperty() isActive!: boolean;
}
