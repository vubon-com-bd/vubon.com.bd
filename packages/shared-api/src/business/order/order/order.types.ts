export type OrderStatus =
  'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface OrderLineItem {
  readonly productId: string;
  readonly variantId?: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalPrice: number;
}

export interface Order {
  readonly id: string;
  readonly orderNumber: string;
  readonly userId: string;
  readonly status: OrderStatus;
  readonly items: readonly OrderLineItem[];
  readonly subtotal: number;
  readonly tax: number;
  readonly shipping: number;
  readonly discount: number;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface CreateOrderRequest {
  readonly cartId: string;
  readonly addressId: string;
  readonly paymentMethod: string;
}

export interface OrderListResponse {
  readonly orders: readonly Order[];
  readonly total: number;
}
