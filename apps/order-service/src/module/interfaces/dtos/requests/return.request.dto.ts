/**
 * Return HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestReturnHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 'defective' })
  readonly reason!: string;

  @ApiProperty({ type: [String], example: ['item-id-1'] })
  readonly itemIds!: readonly string[];

  @ApiPropertyOptional({ type: [String] })
  readonly images?: readonly string[];

  @ApiPropertyOptional({ example: 'screen has scratch' })
  readonly notes?: string;
}

export class ApproveReturnHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiPropertyOptional({ example: 'looks valid' })
  readonly notes?: string;
}

export class RejectReturnHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 'outside return window' })
  readonly reason!: string;
}

export class CompleteReturnHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly orderId!: string;

  @ApiProperty({ example: 1500.0 })
  readonly refundAmount!: number;

  @ApiPropertyOptional({ example: 0 })
  readonly restockFee?: number;

  @ApiPropertyOptional({ example: 'refunded to original method' })
  readonly notes?: string;
}
