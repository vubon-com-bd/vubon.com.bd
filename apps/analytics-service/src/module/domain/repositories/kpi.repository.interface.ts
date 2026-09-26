import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { KpiEntity } from '../entities/kpi.entity';
import { KpiIdVO } from '../value-objects/primitives/kpi-id.vo';
import { KpiNameVO } from '../value-objects/primitives/kpi-name.vo';

export interface KpiRepository extends BaseRepository<KpiEntity, KpiIdVO> {
  findByName(name: KpiNameVO): Promise<KpiEntity | null>;
  findByMetricName(metricName: string): Promise<readonly KpiEntity[]>;
}
