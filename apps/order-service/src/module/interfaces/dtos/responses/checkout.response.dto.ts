/**
 * Checkout HTTP Response DTO
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckoutHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly customerId!: string;
  @ApiPropertyOptional() readonly cartId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly currentStep!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly shippingAddress?: Readonly<Record<string, unknown>>;
  @ApiPropertyOptional() readonly billingAddress?: Readonly<Record<string, unknown>>;
  @ApiPropertyOptional() readonly shippingMethodId?: string;
  @ApiPropertyOptional() readonly paymentMethod?: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly isReadyToConfirm!: boolean;
  @ApiProperty({ type: [String] }) readonly remainingSteps!: readonly string[];
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
