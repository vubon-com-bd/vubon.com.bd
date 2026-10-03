/**
 * RecoveryCodeResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecoveryCodesResponseDTO {
  @ApiProperty({ type: [String] }) codes!: string[];
  @ApiProperty() generatedAt!: string;
  @ApiPropertyOptional() expiresAt?: string;
}

export class RecoveryCodeSummaryDTO {
  @ApiProperty() id!: string;
  @ApiProperty({ example: '****-1234' }) masked!: string;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: string;
}
