export interface CancelOrderRequest {
  readonly reason: string;
  readonly notes?: string;
}

export interface CancelOrderResponse {
  readonly orderId: string;
  readonly status: 'cancelled';
  readonly refundAmount?: number;
  readonly refundId?: string;
}
