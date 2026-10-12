/**
 * Session Revoke Response DTO
 * @module identity-service/interfaces/dtos/responses/session
 */
import { ApiProperty } from '@nestjs/swagger';

export class SessionRevokeHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: 1 }) readonly revokedCount!: number;
  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  readonly revokedAt!: string;
}
