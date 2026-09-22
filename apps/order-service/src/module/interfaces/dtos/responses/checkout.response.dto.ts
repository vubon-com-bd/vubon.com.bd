import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckoutResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  step!: string;

  @ApiPropertyOptional()
  addressId?: string | null;

  @ApiPropertyOptional()
  shippingId?: string | null;

  @ApiPropertyOptional()
  paymentId?: string | null;

  @ApiPropertyOptional()
  expiresAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
