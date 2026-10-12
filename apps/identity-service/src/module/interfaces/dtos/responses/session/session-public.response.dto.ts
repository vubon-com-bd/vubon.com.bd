/**
 * Auth Session Public Response DTO
 * @module identity-service/interfaces/dtos/responses/session
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthSessionPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly ipAddress?: string;
  @ApiPropertyOptional() readonly userAgent?: string;
  @ApiPropertyOptional() readonly deviceId?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly lastAccessedAt!: string;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly isCurrent!: boolean;
}
