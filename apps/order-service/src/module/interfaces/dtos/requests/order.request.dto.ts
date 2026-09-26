import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderRequestDto {
  @ApiProperty({ example: 'user-uuid-here' })
  customerId!: string;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  items!: ReadonlyArray<{
    productId: string;
    variantId?: string;
    productName: string;
    quantity: number;
    price: number;
  }>;

  @ApiProperty({ example: 'web' })
  channel!: string;

  @ApiProperty({ example: 'direct' })
  source!: string;

  @ApiPropertyOptional()
  vendorId?: string;

  @ApiPropertyOptional()
  note?: string;
}

export class UpdateOrderRequestDto {
  @ApiProperty({ example: 'order-uuid' })
  orderId!: string;

  @ApiPropertyOptional()
  note?: string;

  @ApiPropertyOptional()
  channel?: string;

  @ApiPropertyOptional()
  source?: string;
}

export class ConfirmOrderRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  paymentId!: string;
}

export class HoldOrderRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  reason!: string;
}

export class ReleaseOrderRequestDto {
  @ApiProperty()
  orderId!: string;
}

export class CancelOrderRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  reason!: string;
}
