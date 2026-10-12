/**
 * KPI Result Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { KpiResultEntity } from '../entities/kpi-result.entity.js';
import type { KpiIdVO } from '../value-objects/primitives/kpi-id.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface KpiResultRepository extends BaseRepository<KpiResultEntity, string> {
  findByKpiId(kpiId: KpiIdVO): Promise<readonly KpiResultEntity[]>;
  findByKpiInRange(kpiId: KpiIdVO, range: TimeRangeVO): Promise<readonly KpiResultEntity[]>;
  findLatestByKpi(kpiId: KpiIdVO): Promise<KpiResultEntity | null>;
  findBreached(limit: number): Promise<readonly KpiResultEntity[]>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
