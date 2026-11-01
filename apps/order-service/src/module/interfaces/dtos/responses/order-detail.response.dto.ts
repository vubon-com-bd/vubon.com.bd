/**
 * Order Detail HTTP Response DTO (with children)
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';
import { OrderHttpResponseDTO } from './order.response.dto.js';

export class OrderItemSummaryHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly sku!: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly unitPrice!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly status!: string;
}

export class OrderDetailHttpResponseDTO {
  @ApiProperty({ type: OrderHttpResponseDTO })
  readonly order!: OrderHttpResponseDTO;

  @ApiProperty({ type: [OrderItemSummaryHttpDTO] })
  readonly items!: readonly OrderItemSummaryHttpDTO[];
}
