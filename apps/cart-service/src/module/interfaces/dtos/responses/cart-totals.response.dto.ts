/**
 * Cart Totals HTTP Response DTOs
 * @module cart-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class CartTotalsHttpResponseDTO {
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly discount!: number;
  @ApiProperty() readonly taxableBase!: number;
  @ApiProperty() readonly tax!: number;
  @ApiProperty() readonly shipping!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly itemCount!: number;
}

export class ShippingCalculationHttpResponseDTO {
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly method!: string;
  @ApiProperty() readonly cost!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly isFree!: boolean;
  @ApiProperty() readonly estimatedDays!: number;
}
