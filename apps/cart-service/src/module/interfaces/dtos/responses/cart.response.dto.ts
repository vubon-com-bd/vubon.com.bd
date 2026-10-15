/**
 * Cart HTTP Response DTOs
 * @module cart-service/interfaces/dtos/responses
 *
 * Multi-shape:
 *  - Full (admin)
 *  - Public (customer-safe)
 *  - Initiate (POST create)
 *  - Summary (list item)
 *  - List (paginated)
 *  - Stats (aggregated)
 *  - Detail (with items)
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CartItemPublicHttpResponseDTO } from './cart-item.response.dto.js';

// ─── Full (admin) ───────────────────────────
export class CartHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiPropertyOptional() readonly sessionId?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly couponId?: string;
  @ApiPropertyOptional() readonly voucherId?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly lastActivityAt!: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (customer-safe) ─────────────────
export class CartPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly discountAmount!: number;
  @ApiProperty() readonly taxAmount!: number;
  @ApiProperty() readonly shippingAmount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: [CartItemPublicHttpResponseDTO] })
  readonly items!: readonly CartItemPublicHttpResponseDTO[];
}

// ─── Initiate (POST /carts) ─────────────────
export class CartInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly createdAt!: string;
}

// ─── Summary (list item) ────────────────────
export class CartSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly currency!: string;
}

// ─── List (paginated) ───────────────────────
export class CartListHttpResponseDTO {
  @ApiProperty({ type: [CartSummaryHttpResponseDTO] })
  readonly items!: readonly CartSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats (aggregated) ─────────────────────
export class CartStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly totalValue!: number;
  @ApiProperty() readonly averageValue!: number;
  @ApiProperty() readonly averageItemCount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
}

// ─── Detail (with items) ────────────────────
export class CartDetailHttpResponseDTO {
  @ApiProperty({ type: CartHttpResponseDTO })
  readonly cart!: CartHttpResponseDTO;
  @ApiProperty({ type: [CartItemPublicHttpResponseDTO] })
  readonly items!: readonly CartItemPublicHttpResponseDTO[];
}

// ─── Simple action response ─────────────────
export class CartActionHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly message!: string;
  @ApiProperty() readonly at!: string;
}

// ─── Count response ─────────────────────────
export class CartCountHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
}
