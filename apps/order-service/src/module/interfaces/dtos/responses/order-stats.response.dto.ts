/**
 * Order Stats HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class OrderStatsHttpResponseDTO {
  @ApiProperty() readonly totalOrders!: number;
  @ApiProperty() readonly totalRevenue!: number;
  @ApiProperty() readonly averageOrderValue!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ example: { pending: 5, delivered: 10 } })
  readonly byStatus!: Readonly<Record<string, number>>;
}
