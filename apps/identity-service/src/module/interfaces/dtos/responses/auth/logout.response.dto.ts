/**
 * Logout Response DTO
 * @module identity-service/interfaces/dtos/responses/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LogoutHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: 'Logged out successfully' })
  readonly message!: string;

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  readonly loggedOutAt!: string;

  @ApiPropertyOptional({ example: 2 })
  readonly sessionsRevoked?: number;
}
