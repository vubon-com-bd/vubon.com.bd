/**
 * Checkout HTTP Response DTOs
 * @module order-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckoutHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly customerId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly currentStep!: string;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class CheckoutPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly currentStep!: string;
  @ApiProperty() readonly expiresAt!: string;
}

export class CheckoutSessionHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly checkoutId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly currentStep!: string;
  @ApiPropertyOptional() readonly shippingAddressId?: string;
  @ApiPropertyOptional() readonly deliveryMethodId?: string;
  @ApiPropertyOptional() readonly paymentMethod?: string;
  @ApiProperty() readonly startedAt!: string;
  @ApiProperty() readonly lastActivityAt!: string;
}

export class CheckoutConfirmHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty() readonly checkoutId!: string;
  @ApiProperty() readonly orderId!: string;
  @ApiProperty() readonly orderNumber!: string;
}
