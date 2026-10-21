/**
 * Refund HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefundHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly paymentId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly reason!: string;
  @ApiPropertyOptional() readonly note?: string;
  @ApiPropertyOptional() readonly approvedBy?: string;
  @ApiPropertyOptional() readonly completedAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class RefundSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly createdAt!: string;
}

export class RefundListHttpResponseDTO {
  @ApiProperty({ type: [RefundSummaryHttpResponseDTO] })
  readonly items!: readonly RefundSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class RefundStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly totalRefunded!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byReason!: Readonly<Record<string, number>>;
}

export class RefundInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly refundId!: string;
  @ApiProperty() readonly status!: string;
}
