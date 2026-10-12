/**
 * Recovery Codes Response DTO
 * @module identity-service/interfaces/dtos/responses/recovery-code
 */
import { ApiProperty } from '@nestjs/swagger';

export class RecoveryCodesHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: ['ABCD1234EF', 'GHIJ5678KL'] })
  readonly codes!: readonly string[];
  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  readonly generatedAt!: string;
  @ApiProperty({ example: 10 }) readonly remainingCount!: number;
}
