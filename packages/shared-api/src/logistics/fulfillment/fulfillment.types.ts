export type FulfillmentStatus = 'pending' | 'picking' | 'packed' | 'shipped' | 'cancelled';

export interface Fulfillment {
  readonly id: string;
  readonly orderId: string;
  readonly warehouseId: string;
  readonly status: FulfillmentStatus;
  readonly items: readonly { readonly productId: string; readonly quantity: number }[];
  readonly createdAt: string;
}

export interface FulfillmentListResponse {
  readonly fulfillments: readonly Fulfillment[];
  readonly total: number;
}
