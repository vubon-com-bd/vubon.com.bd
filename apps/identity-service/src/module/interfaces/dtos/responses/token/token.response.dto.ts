/**
 * Auth Token Response DTO
 * @module identity-service/interfaces/dtos/responses/token
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthTokenHttpResponseDTO {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  readonly accessToken!: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  readonly refreshToken!: string;

  @ApiProperty({ example: 'Bearer', default: 'Bearer' })
  readonly tokenType!: 'Bearer';

  @ApiProperty({ example: 900 })
  readonly expiresIn!: number;

  @ApiProperty({ example: 1700000900 })
  readonly expiresAt!: number;

  @ApiPropertyOptional({ example: ['read', 'write'] })
  readonly scope?: readonly string[];
}
