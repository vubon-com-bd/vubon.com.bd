/**
 * CartItem HTTP Response DTOs
 * @module cart-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────────
export class CartItemHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly unitPrice!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly subtotal!: number;
  @ApiPropertyOptional() readonly note?: string;
  @ApiProperty() readonly addedAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (customer-safe) ─────────────────
export class CartItemPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly unitPrice!: number;
  @ApiProperty() readonly subtotal!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly isAvailable!: boolean;
  @ApiPropertyOptional() readonly note?: string;
}

// ─── Summary (list item) ────────────────────
export class CartItemSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly productId!: string;
  @ApiProperty() readonly quantity!: number;
  @ApiProperty() readonly subtotal!: number;
}

// ─── List (paginated) ───────────────────────
export class CartItemListHttpResponseDTO {
  @ApiProperty({ type: [CartItemSummaryHttpResponseDTO] })
  readonly items!: readonly CartItemSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
