/**
 * Transaction Response DTOs
 * @module payment-service/application/dtos/responses
 */
export interface TransactionResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly type: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly gateway?: string;
  readonly gatewayTransactionId?: string;
  readonly reference?: string;
  readonly idempotencyKey?: string;
  readonly errorCode?: string;
  readonly errorMessage?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly processedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TransactionPublicResponseDTO {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly reference?: string;
  readonly createdAt: string;
}

export interface TransactionListResponseDTO {
  readonly items: readonly TransactionResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
