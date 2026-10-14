/**
 * Performance Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface PerformanceResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly overallScore: number;
  readonly grade: string;
  readonly orderFulfillmentRate: number;
  readonly onTimeShippingRate: number;
  readonly orderCancellationRate: number;
  readonly returnRate: number;
  readonly customerSatisfaction: number;
  readonly averageResponseTimeHours: number;
  readonly averageResolutionTimeHours: number;
  readonly totalOrders: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly evaluatedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PerformanceSummaryResponseDTO {
  readonly id: string;
  readonly overallScore: number;
  readonly grade: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly evaluatedAt: string;
}

export interface PerformanceStatsResponseDTO {
  readonly total: number;
  readonly averageScore: number;
  readonly averageGrade: string;
  readonly byGrade: Readonly<Record<string, number>>;
  readonly warningCount: number;
  readonly autoSuspendCount: number;
}
