/**
 * Transaction HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TransactionHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly paymentId!: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly gateway?: string;
  @ApiPropertyOptional() readonly gatewayTransactionId?: string;
  @ApiPropertyOptional() readonly reference?: string;
  @ApiPropertyOptional() readonly idempotencyKey?: string;
  @ApiPropertyOptional() readonly errorCode?: string;
  @ApiPropertyOptional() readonly errorMessage?: string;
  @ApiPropertyOptional() readonly metadata?: Readonly<Record<string, unknown>>;
  @ApiPropertyOptional() readonly processedAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class TransactionListHttpResponseDTO {
  @ApiProperty({ type: [TransactionHttpResponseDTO] })
  readonly items!: readonly TransactionHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
