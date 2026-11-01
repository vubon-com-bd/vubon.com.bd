/**
 * Payout HTTP Response DTOs
 * @module vendor-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PayoutHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly vendorId!: string;
  @ApiProperty() readonly bankAccountId!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly fee!: number;
  @ApiProperty() readonly netAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly method!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly requestedAt!: string;
  @ApiPropertyOptional() readonly processedAt?: string;
  @ApiPropertyOptional() readonly paidAt?: string;
  @ApiPropertyOptional() readonly transactionId?: string;
  @ApiPropertyOptional() readonly rejectionReason?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class PayoutPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly netAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly requestedAt!: string;
  @ApiPropertyOptional() readonly paidAt?: string;
}

export class PayoutInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly payoutId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly netAmount!: number;
  @ApiProperty() readonly currency!: string;
}

export class PayoutSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly method!: string;
  @ApiProperty() readonly requestedAt!: string;
  @ApiProperty() readonly createdAt!: string;
}

export class PayoutListHttpResponseDTO {
  @ApiProperty({ type: [PayoutSummaryHttpResponseDTO] })
  readonly items!: readonly PayoutSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class PayoutStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly totalAmount!: number;
  @ApiProperty() readonly totalPaidAmount!: number;
  @ApiProperty() readonly totalPendingAmount!: number;
  @ApiProperty() readonly averageAmount!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byMethod!: Readonly<Record<string, number>>;
}
