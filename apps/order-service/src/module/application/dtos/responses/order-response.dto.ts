/**
 * Order Response DTOs
 * @module order-service/application/dtos/responses
 */
import type {
  OrderStatusValue,
  OrderPriorityValue,
} from '@vubon/shared-types/business/order';

export interface OrderItemResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly type: string;
  readonly status: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly compareAtPrice?: number;
  readonly lineSubtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly lineTotal: number;
  readonly currency: string;
  readonly notes?: string;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface OrderResponseDTO {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly vendorIds: readonly string[];
  readonly type: string;
  readonly status: OrderStatusValue;
  readonly priority: OrderPriorityValue;
  readonly items: readonly OrderItemResponseDTO[];
  readonly itemCount: number;
  readonly uniqueItemCount: number;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly paymentId?: string;
  readonly paymentStatus?: string;
  readonly paymentMethod?: string;
  readonly shippingMethod?: string;
  readonly trackingNumber?: string;
  readonly notes?: string;
  readonly customerNotes?: string;
  readonly confirmedAt?: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
  readonly cancelledAt?: string;
  readonly completedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
