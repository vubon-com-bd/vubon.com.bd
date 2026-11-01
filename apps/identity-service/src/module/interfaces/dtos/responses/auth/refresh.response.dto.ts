/**
 * Refresh Token Response DTO
 * @module identity-service/interfaces/dtos/responses/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefreshHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  readonly accessToken!: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  readonly refreshToken!: string;

  @ApiProperty({ example: 1700000900 })
  readonly expiresAt!: number;

  @ApiProperty({ example: 'Bearer', default: 'Bearer' })
  readonly tokenType!: 'Bearer';

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  readonly refreshedAt!: string;
}
