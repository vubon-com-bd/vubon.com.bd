/**
 * VendorPerformanceRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorPerformanceEntity } from '../entities/vendor-performance.entity.js';
import { PerformanceGradeVO } from '../value-objects/primitives/performance-grade.vo.js';

export const VENDOR_PERFORMANCE_REPOSITORY = Symbol('VENDOR_PERFORMANCE_REPOSITORY');

export interface PerformanceStats {
  readonly avgScore: number;
  readonly byGrade: Readonly<Record<string, number>>;
  readonly atRiskCount: number;
  readonly suspendedCount: number;
  readonly warnedCount: number;
}

export interface VendorPerformanceRepository extends BaseRepository<VendorPerformanceEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorPerformanceEntity[]>;
  findLatestByVendorId(vendorId: string): Promise<VendorPerformanceEntity | null>;
  findByGrade(grade: PerformanceGradeVO): Promise<readonly VendorPerformanceEntity[]>;

  /** Vendors at risk (below warning threshold). */
  findAtRisk(): Promise<readonly VendorPerformanceEntity[]>;
  /** Vendors eligible for auto-suspend. */
  findAutoSuspendCandidates(): Promise<readonly VendorPerformanceEntity[]>;
  /** Vendors eligible for reinstatement. */
  findReinstatementCandidates(): Promise<readonly VendorPerformanceEntity[]>;
  /** Evaluations due (period ended, no new evaluation). */
  findEvaluationDue(): Promise<readonly VendorPerformanceEntity[]>;

  getStats(): Promise<PerformanceStats>;
  countByGrade(grade: PerformanceGradeVO): Promise<number>;
  deleteByVendorId(vendorId: string): Promise<void>;
}
