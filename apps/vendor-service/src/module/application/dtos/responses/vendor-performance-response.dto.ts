/**
 * VendorPerformanceResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_PERFORMANCE_METRIC,
  VENDOR_PERFORMANCE_GRADE,
} from '@vubon/shared-constants/business';

export interface PerformanceMetricDto {
  readonly metric: (typeof VENDOR_PERFORMANCE_METRIC)[keyof typeof VENDOR_PERFORMANCE_METRIC];
  readonly value: number;
  readonly target: number;
  readonly grade: (typeof VENDOR_PERFORMANCE_GRADE)[keyof typeof VENDOR_PERFORMANCE_GRADE];
}

export interface VendorPerformanceResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly grade: (typeof VENDOR_PERFORMANCE_GRADE)[keyof typeof VENDOR_PERFORMANCE_GRADE];
  readonly overallScore: number;
  readonly metrics: readonly PerformanceMetricDto[];
  readonly evaluationPeriodStart: string;
  readonly evaluationPeriodEnd: string;
  readonly orderCount: number;
  readonly isSuspended: boolean;
  readonly warningIssued: boolean;
  readonly isAtRisk: boolean;
  readonly hasEnoughData: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
