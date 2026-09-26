import { ApiProperty } from '@nestjs/swagger';

export class CartTotalsResponseDto {
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
}
