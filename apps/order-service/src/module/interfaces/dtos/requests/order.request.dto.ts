/**
 * Order HTTP Request DTOs
 * @module order-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderItemHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly productId!: string;

  @ApiPropertyOptional({ example: '8a9e6679-7425-40de-944b-e07fc1f90ae8' })
  readonly variantId?: string;

  @ApiPropertyOptional({ example: '9b9e6679-7425-40de-944b-e07fc1f90ae9' })
  readonly vendorId?: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 999 })
  readonly quantity!: number;

  @ApiPropertyOptional({ example: 1500.0 })
  readonly unitPrice?: number;

  @ApiPropertyOptional({ example: 100.0 })
  readonly discountAmount?: number;

  @ApiPropertyOptional({ example: 'gift wrap please' })
  readonly notes?: string;
}

export class CreateOrderHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly customerId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly cartId?: string;

  @ApiProperty({ type: [CreateOrderItemHttpDTO] })
  readonly items!: readonly CreateOrderItemHttpDTO[];

  @ApiProperty({
    example: {
      fullName: 'John Doe',
      phone: '01700000000',
      line1: '123 Main St',
      city: 'Dhaka',
      country: 'BD',
    },
  })
  readonly shippingAddress!: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  readonly billingAddress?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: 'standard' })
  readonly shippingMethod?: string;

  @ApiPropertyOptional({ example: 'bkash' })
  readonly paymentMethod?: string;

  @ApiPropertyOptional({ example: 'BDT', minLength: 3, maxLength: 3 })
  readonly currency?: string;

  @ApiPropertyOptional({ example: 'Please deliver between 5-8 PM' })
  readonly customerNotes?: string;

  @ApiPropertyOptional({ example: 'internal note' })
  readonly notes?: string;

  @ApiPropertyOptional({ example: 'idem-key-abc-123456' })
  readonly idempotencyKey?: string;
}

export class UpdateOrderHttpDTO {
  @ApiPropertyOptional({ example: 'pending' })
  readonly status?: string;

  @ApiPropertyOptional({ example: 'internal note updated' })
  readonly notes?: string;

  @ApiPropertyOptional({ example: 'customer note updated' })
  readonly customerNotes?: string;

  @ApiPropertyOptional({ example: 'express' })
  readonly shippingMethod?: string;

  @ApiPropertyOptional({ example: 'TRK-ABCD1234' })
  readonly trackingNumber?: string;
}

export class HoldOrderHttpDTO {
  @ApiProperty({ example: 'Customer requested delay' })
  readonly reason!: string;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z' })
  readonly holdUntil?: string;
}

export class ReleaseOrderHttpDTO {
  @ApiPropertyOptional({ example: 'Released by admin' })
  readonly note?: string;
}
