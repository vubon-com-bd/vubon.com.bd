/**
 * Refund HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefundHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly paymentId!: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly reason?: string;
  @ApiPropertyOptional() readonly gatewayRefundId?: string;
  @ApiPropertyOptional() readonly processedAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class RefundPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly amount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly reason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiPropertyOptional() readonly processedAt?: string;
}

export class RefundRequestHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly refundId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly refundedAmount!: number;
}

export class RefundSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly paymentId!: string;
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
