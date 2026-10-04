/**
 * Payment HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentTransactionSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly reference?: string;
  @ApiProperty() readonly createdAt!: string;
}

export class PaymentHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly method!: string;
  @ApiPropertyOptional() readonly gateway?: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly gatewayPaymentId?: string;
  @ApiPropertyOptional() readonly idempotencyKey?: string;
  @ApiProperty() readonly refundedAmount!: number;
  @ApiProperty() readonly refundableRemaining!: number;
  @ApiProperty() readonly retryAttempts!: number;
  @ApiPropertyOptional() readonly authorizedAt?: string;
  @ApiPropertyOptional() readonly capturedAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly expiredAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiPropertyOptional() readonly failureCode?: string;
  @ApiPropertyOptional() readonly metadata?: Readonly<Record<string, unknown>>;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class PaymentPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly method!: string;
  @ApiPropertyOptional() readonly gateway?: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly refundedAmount!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiPropertyOptional() readonly capturedAt?: string;
}

export class PaymentInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly paymentId!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly redirectUrl?: string;
  @ApiPropertyOptional() readonly gatewayPaymentId?: string;
}

export class PaymentSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly createdAt!: string;
}

export class PaymentListHttpResponseDTO {
  @ApiProperty({ type: [PaymentSummaryHttpResponseDTO] })
  readonly items!: readonly PaymentSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class PaymentStatsHttpResponseDTO {
  @ApiProperty() readonly totalPayments!: number;
  @ApiProperty() readonly totalCaptured!: number;
  @ApiProperty() readonly totalRefunded!: number;
  @ApiProperty() readonly averageAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byGateway!: Readonly<Record<string, number>>;
}

export class PaymentDetailHttpResponseDTO {
  @ApiProperty({ type: PaymentHttpResponseDTO })
  readonly payment!: PaymentHttpResponseDTO;
  @ApiProperty({ type: [PaymentTransactionSummaryHttpResponseDTO] })
  readonly transactions!: readonly PaymentTransactionSummaryHttpResponseDTO[];
}
