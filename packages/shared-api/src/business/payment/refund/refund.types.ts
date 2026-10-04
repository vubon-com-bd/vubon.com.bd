export type RefundStatus = 'pending' | 'approved' | 'rejected' | 'processed';
export type RefundReason = 'customer_request' | 'duplicate' | 'fraudulent' | 'product_issue';

export interface Refund {
  readonly id: string;
  readonly paymentId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: RefundStatus;
  readonly reason: RefundReason;
  readonly createdAt: string;
}

export interface CreateRefundRequest {
  readonly amount?: number;
  readonly reason: RefundReason;
  readonly notes?: string;
}
