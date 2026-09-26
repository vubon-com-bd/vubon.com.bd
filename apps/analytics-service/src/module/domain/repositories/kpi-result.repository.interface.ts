import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { KpiResultEntity } from '../entities/kpi-result.entity';
import { KpiIdVO } from '../value-objects/primitives/kpi-id.vo';

export interface KpiResultRepository
  extends BaseRepository<KpiResultEntity, string> {
  findByKpiId(kpiId: KpiIdVO): Promise<readonly KpiResultEntity[]>;
  findLatestByKpiId(kpiId: KpiIdVO): Promise<KpiResultEntity | null>;
}
