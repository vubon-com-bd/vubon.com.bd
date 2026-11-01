/**
 * IVendorPerformanceService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  PerformanceResponseDTO,
  PerformanceSummaryResponseDTO,
  PerformanceStatsResponseDTO,
} from '../../dtos/responses/performance-response.dto.js';

export const VENDOR_PERFORMANCE_SERVICE = Symbol('VENDOR_PERFORMANCE_SERVICE');

export interface PerformanceListFilterDTO {
  readonly vendorId?: string;
  readonly grade?: string | readonly string[];
  readonly minScore?: number;
  readonly maxScore?: number;
  readonly triggersWarning?: boolean;
  readonly triggersAutoSuspend?: boolean;
}

export interface PerformanceListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'evaluatedAt' | 'overallScore' | 'periodEnd';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PerformanceListFilterDTO;
}

export interface IVendorPerformanceService {
  evaluate(vendorId: string, periodStart: string, periodEnd: string, actorId?: string): Promise<PerformanceResponseDTO>;
  getLatest(vendorId: string): Promise<PerformanceResponseDTO | null>;
  getById(id: string): Promise<PerformanceResponseDTO>;
  listByVendor(vendorId: string): Promise<readonly PerformanceSummaryResponseDTO[]>;
  listTopPerformers(limit?: number): Promise<readonly PerformanceSummaryResponseDTO[]>;
  listBottomPerformers(limit?: number): Promise<readonly PerformanceSummaryResponseDTO[]>;
  getStats(vendorId?: string): Promise<PerformanceStatsResponseDTO>;
}
