/**
 * Checkout HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartCheckoutHttpDTO {
  @ApiPropertyOptional({
    enum: ['guest', 'registered', 'express', 'one_click', 'subscription'],
    example: 'registered',
  })
  readonly type?: 'guest' | 'registered' | 'express' | 'one_click' | 'subscription';

  @ApiProperty({ example: 'customer@example.com' })
  readonly email!: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly cartId!: string;

  @ApiPropertyOptional({ example: '01700000000' })
  readonly phone?: string;
}

export class SelectAddressHttpDTO {
  @ApiProperty({
    example: {
      line1: '123 Main St',
      city: 'Dhaka',
      country: 'BD',
    },
  })
  readonly shippingAddress!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  readonly billingAddress?: Readonly<Record<string, unknown>>;
}

export class SelectShippingHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly shippingMethodId!: string;

  @ApiPropertyOptional({ example: 'prefer morning slot' })
  readonly notes?: string;
}

export class SelectPaymentHttpDTO {
  @ApiProperty({ example: 'bkash' })
  readonly paymentMethod!: string;

  @ApiPropertyOptional({ example: 'bkash-gateway' })
  readonly paymentGateway?: string;
}

export class ConfirmCheckoutHttpDTO {
  @ApiPropertyOptional({ example: 'idem-checkout-abc-123456' })
  readonly idempotencyKey?: string;
}

export class AbandonCheckoutHttpDTO {
  @ApiPropertyOptional({ example: 'changed my mind' })
  readonly reason?: string;
}
