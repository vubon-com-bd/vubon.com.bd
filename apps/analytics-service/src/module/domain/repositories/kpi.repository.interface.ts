/**
 * KPI Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { KpiEntity } from '../entities/kpi.entity.js';
import type { KpiIdVO } from '../value-objects/primitives/kpi-id.vo.js';
import type { MetricNameVO } from '../value-objects/primitives/metric-name.vo.js';

export interface KpiRepository extends BaseRepository<KpiEntity, string> {
  findByKpiId(id: KpiIdVO): Promise<KpiEntity | null>;
  findByMetric(metric: MetricNameVO): Promise<readonly KpiEntity[]>;
  findAllActive(): Promise<readonly KpiEntity[]>;
  findInactive(): Promise<readonly KpiEntity[]>;
}
