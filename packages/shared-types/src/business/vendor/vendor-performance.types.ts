/**
 * Vendor Performance Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-performance.constants থেকে।
 */

import type {
  VENDOR_PERFORMANCE_METRIC,
  VENDOR_PERFORMANCE_GRADE,
} from '@vubon/shared-constants/business';
import type { VendorId } from '../../common/primitives';

export type VendorPerformanceMetricValue =
  (typeof VENDOR_PERFORMANCE_METRIC)[keyof typeof VENDOR_PERFORMANCE_METRIC];

export type VendorPerformanceGradeValue =
  (typeof VENDOR_PERFORMANCE_GRADE)[keyof typeof VENDOR_PERFORMANCE_GRADE];

export interface VendorPerformance {
  readonly vendorId: VendorId;
  readonly grade: VendorPerformanceGradeValue;
  readonly metrics: readonly VendorPerformanceMetrics[];
  readonly overallScore: number;
  readonly evaluationPeriodStart: string;
  readonly evaluationPeriodEnd: string;
  readonly orderCount: number;
  readonly isSuspended: boolean;
  readonly warningIssued: boolean;
  readonly evaluatedAt: string;
}

export interface VendorPerformanceMetrics {
  readonly metric: VendorPerformanceMetricValue;
  readonly value: number;
  readonly target: number;
  readonly grade: VendorPerformanceGradeValue;
}

export interface VendorPerformanceHistory {
  readonly vendorId: VendorId;
  readonly grade: VendorPerformanceGradeValue;
  readonly overallScore: number;
  readonly evaluatedAt: string;
}
