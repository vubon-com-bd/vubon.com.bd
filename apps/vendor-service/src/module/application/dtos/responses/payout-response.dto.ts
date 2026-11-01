/**
 * Payout Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface PayoutResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly bankAccountId: string;
  readonly amount: number;
  readonly fee: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly method: string;
  readonly status: string;
  readonly requestedAt: string;
  readonly processedAt?: string;
  readonly paidAt?: string;
  readonly transactionId?: string;
  readonly rejectionReason?: string;
  readonly failureReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PayoutPublicResponseDTO {
  readonly id: string;
  readonly amount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly status: string;
  readonly requestedAt: string;
  readonly paidAt?: string;
}

export interface PayoutSummaryResponseDTO {
  readonly id: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: string;
  readonly method: string;
  readonly requestedAt: string;
  readonly createdAt: string;
}

export interface PayoutListResponseDTO {
  readonly items: readonly PayoutSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export interface PayoutStatsResponseDTO {
  readonly total: number;
  readonly totalAmount: number;
  readonly totalPaidAmount: number;
  readonly totalPendingAmount: number;
  readonly averageAmount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byMethod: Readonly<Record<string, number>>;
}

export interface PayoutInitiateResponseDTO {
  readonly success: true;
  readonly payoutId: string;
  readonly status: string;
  readonly netAmount: number;
  readonly currency: string;
}
