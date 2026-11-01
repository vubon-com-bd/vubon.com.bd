/**
 * Vendor Performance Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorPerformanceEntity } from '../entities/vendor-performance.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { PerformanceIdVO } from '../value-objects/primitives/performance-id.vo.js';

export const VENDOR_PERFORMANCE_REPOSITORY = Symbol('VENDOR_PERFORMANCE_REPOSITORY');

export interface VendorPerformanceListFilter {
  readonly vendorId?: string;
  readonly grade?: string | readonly string[];
  readonly minScore?: number;
  readonly maxScore?: number;
  readonly minOrders?: number;
  readonly periodStartFrom?: string;
  readonly periodEndTo?: string;
  readonly triggersWarning?: boolean;
  readonly triggersAutoSuspend?: boolean;
}

export interface VendorPerformanceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'evaluatedAt' | 'overallScore' | 'periodEnd';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorPerformanceListFilter;
}

export interface VendorPerformancePaginationResult {
  readonly items: readonly VendorPerformanceEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorPerformanceRepository
  extends BaseRepository<VendorPerformanceEntity, string> {
  findByIdVO(id: PerformanceIdVO): Promise<VendorPerformanceEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorPerformanceEntity[]>;
  findLatestByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorPerformanceEntity | null>;
  findByPeriod(
    vendorId: string,
    periodStart: string,
    periodEnd: string,
  ): Promise<VendorPerformanceEntity | null>;
  findByGrade(grade: string): Promise<readonly VendorPerformanceEntity[]>;
  findTopPerformers(limit?: number): Promise<readonly VendorPerformanceEntity[]>;
  findBottomPerformers(limit?: number): Promise<readonly VendorPerformanceEntity[]>;
  findTriggeringWarning(): Promise<readonly VendorPerformanceEntity[]>;
  findTriggeringAutoSuspend(): Promise<readonly VendorPerformanceEntity[]>;
  findEligibleForEvaluation(): Promise<readonly VendorPerformanceEntity[]>;
  findPaginated(
    options: VendorPerformanceListOptions,
  ): Promise<VendorPerformancePaginationResult>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly averageScore: number;
    readonly averageGrade: string;
    readonly byGrade: Readonly<Record<string, number>>;
    readonly warningCount: number;
    readonly autoSuspendCount: number;
  }>;
}
