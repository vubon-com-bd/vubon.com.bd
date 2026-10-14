/**
 * Settlement Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface SettlementResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly status: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly grossAmount: number;
  readonly commissionAmount: number;
  readonly refundAmount: number;
  readonly adjustmentAmount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly orderCount: number;
  readonly payoutId?: string;
  readonly processedAt?: string;
  readonly completedAt?: string;
  readonly failedReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SettlementSummaryResponseDTO {
  readonly id: string;
  readonly netAmount: number;
  readonly currency: string;
  readonly status: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly createdAt: string;
}

export interface SettlementListResponseDTO {
  readonly items: readonly SettlementSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SettlementStatsResponseDTO {
  readonly total: number;
  readonly totalGross: number;
  readonly totalNet: number;
  readonly totalCommission: number;
  readonly totalRefunds: number;
  readonly averageNetAmount: number;
  readonly byStatus: Readonly<Record<string, number>>;
}
