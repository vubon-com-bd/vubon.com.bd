import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  productId!: string;

  @ApiPropertyOptional()
  variantId?: string | null;

  @ApiProperty()
  productName!: string;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  priceAtPurchase!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  lineTotal!: number;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
