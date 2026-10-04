/**
 * Transaction Request DTOs
 * @module payment-service/application/dtos/requests/transaction
 */
export interface CreateTransactionRequestDTO {
  readonly paymentId: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly type: string;
  readonly amount: number;
  readonly currency: string;
  readonly gateway?: string;
  readonly gatewayTransactionId?: string;
  readonly reference?: string;
  readonly idempotencyKey?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ListTransactionsRequestDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly paymentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly gateway?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}
