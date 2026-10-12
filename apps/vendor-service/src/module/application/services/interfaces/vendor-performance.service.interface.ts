/**
 * IVendorPerformanceService
 * @module vendor-service/application/services/interfaces
 */
import type { VendorPerformanceResponseDto } from '../../dtos/responses/vendor-performance-response.dto.js';

export const VENDOR_PERFORMANCE_SERVICE = Symbol('VENDOR_PERFORMANCE_SERVICE');

export interface EvaluatePerformanceInput {
  readonly vendorId: string;
  readonly evaluationPeriodStart: string;
  readonly evaluationPeriodEnd: string;
  readonly orderCount: number;
}

export interface IVendorPerformanceService {
  evaluate(input: EvaluatePerformanceInput, actorId?: string): Promise<VendorPerformanceResponseDto>;
  issueWarning(vendorId: string, actorId?: string): Promise<VendorPerformanceResponseDto>;
  clearWarning(vendorId: string, actorId?: string): Promise<VendorPerformanceResponseDto>;
  suspend(vendorId: string, actorId?: string): Promise<VendorPerformanceResponseDto>;
  reinstate(vendorId: string, actorId?: string): Promise<VendorPerformanceResponseDto>;
  recalculate(vendorId: string, actorId?: string): Promise<VendorPerformanceResponseDto>;
  getLatestByVendorId(vendorId: string): Promise<VendorPerformanceResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorPerformanceResponseDto[]>;
}
