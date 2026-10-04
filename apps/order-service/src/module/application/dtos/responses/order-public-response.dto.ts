import type {
  OrderStatusValue,
  OrderPriorityValue,
} from '@vubon/shared-types/business/order';

export interface OrderPublicItemResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly total: number;
  readonly status: string;
}

export interface OrderPublicResponseDTO {
  readonly id: string;
  readonly orderNumber: string;
  readonly status: OrderStatusValue;
  readonly priority: OrderPriorityValue;
  readonly items: readonly OrderPublicItemResponseDTO[];
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly trackingNumber?: string;
  readonly createdAt: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
}
