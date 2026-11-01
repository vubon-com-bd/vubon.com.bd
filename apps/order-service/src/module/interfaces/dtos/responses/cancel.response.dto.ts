/**
 * Cancel HTTP Response DTOs
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CancelHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly reason!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly requestedBy!: string;
  @ApiPropertyOptional() readonly approvedBy?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiPropertyOptional() readonly refundAmount?: number;
  @ApiProperty() readonly requestedAt!: string;
  @ApiPropertyOptional() readonly processedAt?: string;
}

export class CancelSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly reason!: string;
  @ApiProperty() readonly requestedAt!: string;
}

export class CancelListHttpResponseDTO {
  @ApiProperty({ type: [CancelSummaryHttpResponseDTO] })
  readonly items!: readonly CancelSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
