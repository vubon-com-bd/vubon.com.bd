import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CartResponseDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  userId?: string | null;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  subtotal!: number;

  @ApiProperty()
  discountTotal!: number;

  @ApiProperty()
  taxTotal!: number;

  @ApiProperty()
  shippingTotal!: number;

  @ApiProperty()
  grandTotal!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}

export class CartSummaryResponseDto {
  @ApiProperty()
  cartId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  subtotal!: number;

  @ApiProperty()
  discountTotal!: number;

  @ApiProperty()
  grandTotal!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  hasCoupon!: boolean;

  @ApiProperty()
  hasVoucher!: boolean;
}
