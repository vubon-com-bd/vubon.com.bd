import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartCheckoutRequestDto {
  @ApiProperty()
  customerId!: string;

  @ApiPropertyOptional()
  cartId?: string;
}

export class SelectAddressRequestDto {
  @ApiProperty()
  checkoutId!: string;

  @ApiProperty()
  addressId!: string;
}

export class SelectShippingRequestDto {
  @ApiProperty()
  checkoutId!: string;

  @ApiProperty()
  methodId!: string;
}

export class SelectPaymentRequestDto {
  @ApiProperty()
  checkoutId!: string;

  @ApiProperty()
  paymentMethod!: string;
}

export class ConfirmCheckoutRequestDto {
  @ApiProperty()
  checkoutId!: string;
}

export class AbandonCheckoutRequestDto {
  @ApiProperty()
  checkoutId!: string;

  @ApiPropertyOptional()
  reason?: string;
}
