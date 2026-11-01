/**
 * Order List HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class OrderSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly createdAt!: string;
}

export class OrderListHttpResponseDTO {
  @ApiProperty({ type: [OrderSummaryHttpResponseDTO] })
  readonly items!: readonly OrderSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class OrderStatsHttpResponseDTO {
  @ApiProperty() readonly totalOrders!: number;
  @ApiProperty() readonly totalRevenue!: number;
  @ApiProperty() readonly averageOrderValue!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
}
