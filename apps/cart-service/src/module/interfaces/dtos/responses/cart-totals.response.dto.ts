import { ApiProperty } from '@nestjs/swagger';

export class CartTotalsResponseHttpDTO {
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly itemDiscounts!: number;
  @ApiProperty() readonly couponDiscount!: number;
  @ApiProperty() readonly voucherDiscount!: number;
  @ApiProperty() readonly totalDiscounts!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly grandTotal!: number;
  @ApiProperty() readonly discountPercent!: number;
  @ApiProperty() readonly hasDiscount!: boolean;
  @ApiProperty() readonly hasFreeShipping!: boolean;
}
