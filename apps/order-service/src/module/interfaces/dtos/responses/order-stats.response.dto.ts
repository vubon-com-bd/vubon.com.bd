import { ApiProperty } from '@nestjs/swagger';

export class OrderStatsResponseDto {
  @ApiProperty()
  totalOrders!: number;

  @ApiProperty()
  pendingOrders!: number;

  @ApiProperty()
  confirmedOrders!: number;

  @ApiProperty()
  shippedOrders!: number;

  @ApiProperty()
  deliveredOrders!: number;

  @ApiProperty()
  cancelledOrders!: number;

  @ApiProperty()
  totalRevenue!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;
}
