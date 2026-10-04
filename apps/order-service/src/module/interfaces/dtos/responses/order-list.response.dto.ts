/**
 * Order List HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class OrderSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly orderNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
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
