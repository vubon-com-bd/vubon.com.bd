export type ReturnReason = 'damaged' | 'wrong_item' | 'not_as_described' | 'changed_mind';

export interface ReturnItemRequest {
  readonly orderItemId: string;
  readonly quantity: number;
}

export interface ReturnOrderRequest {
  readonly items: readonly ReturnItemRequest[];
  readonly reason: ReturnReason;
  readonly notes?: string;
}

export interface ReturnOrderResponse {
  readonly returnId: string;
  readonly orderId: string;
  readonly status: 'requested' | 'approved' | 'rejected';
  readonly refundAmount?: number;
}
