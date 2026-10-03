export interface FulfillmentResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly vendorId?: string;
  readonly status: string;
  readonly type: string;
  readonly itemIds: readonly string[];
  readonly itemCount: number;
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly shippingCost?: number;
  readonly currency: string;
  readonly fulfilledAt?: string;
  readonly deliveredAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface FulfillmentListResponseDTO {
  readonly items: readonly FulfillmentResponseDTO[];
  readonly total: number;
}
