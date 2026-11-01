/**
 * Commission Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface CommissionResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly type: string;
  readonly rate: number;
  readonly fixedAmount?: number;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly categoryOverrides?: Readonly<Record<string, number>>;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
  readonly isActive: boolean;
  readonly isCurrentlyActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CommissionSummaryResponseDTO {
  readonly id: string;
  readonly type: string;
  readonly rate: number;
  readonly isCurrentlyActive: boolean;
  readonly effectiveFrom: string;
}

export interface CommissionListResponseDTO {
  readonly items: readonly CommissionSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CommissionCalculationResponseDTO {
  readonly orderAmount: number;
  readonly taxableAmount: number;
  readonly commissionType: string;
  readonly commissionRate: number | null;
  readonly commissionAmount: number;
  readonly vatAmount: number;
  readonly totalDeduction: number;
  readonly netPayout: number;
  readonly appliedConstraints: readonly string[];
}

export interface CommissionStatsResponseDTO {
  readonly total: number;
  readonly active: number;
  readonly expired: number;
  readonly averageRate: number;
  readonly byType: Readonly<Record<string, number>>;
}
