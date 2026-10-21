/**
 * Split Payment HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SplitReceiverHttpResponseDTO {
  @ApiProperty() readonly receiverId!: string;
  @ApiProperty() readonly amount!: number;
  @ApiPropertyOptional() readonly percentage?: number;
}

export class SplitHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly paymentId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly totalAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: [SplitReceiverHttpResponseDTO] })
  readonly receivers!: readonly SplitReceiverHttpResponseDTO[];
  @ApiProperty() readonly isExecuted!: boolean;
  @ApiPropertyOptional() readonly executedAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class SplitListHttpResponseDTO {
  @ApiProperty({ type: [SplitHttpResponseDTO] })
  readonly items!: readonly SplitHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
