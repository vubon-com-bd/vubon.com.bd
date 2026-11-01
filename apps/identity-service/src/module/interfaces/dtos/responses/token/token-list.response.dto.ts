/**
 * Token List Response DTO
 * @module identity-service/interfaces/dtos/responses/token
 */
import { ApiProperty } from '@nestjs/swagger';

export class TokenSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly issuedAt!: string;
  @ApiProperty() readonly expiresAt!: number;
  @ApiProperty() readonly revoked!: boolean;
}

export class TokenListHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ type: [TokenSummaryHttpResponseDTO] })
  readonly tokens!: readonly TokenSummaryHttpResponseDTO[];
  @ApiProperty({ example: 3 }) readonly total!: number;
}
