/**
 * Invoice HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvoiceHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly invoiceNumber!: string;
  @ApiProperty() readonly userId!: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly issuedAt?: string;
  @ApiPropertyOptional() readonly dueAt?: string;
  @ApiPropertyOptional() readonly paidAt?: string;
  @ApiPropertyOptional() readonly voidedAt?: string;
  @ApiPropertyOptional() readonly refundedAt?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class InvoiceSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly invoiceNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly dueAt?: string;
}

export class InvoiceListHttpResponseDTO {
  @ApiProperty({ type: [InvoiceSummaryHttpResponseDTO] })
  readonly items!: readonly InvoiceSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class InvoiceStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly totalAmount!: number;
  @ApiProperty() readonly outstandingAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
}
