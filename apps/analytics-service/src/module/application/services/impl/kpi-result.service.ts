/**
 * KPI Result Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { KpiResultEntity } from '../../../domain/entities/kpi-result.entity.js';
import type { KpiResultRepository } from '../../../domain/repositories/kpi-result.repository.interface.js';
import { KpiIdVO } from '../../../domain/value-objects/primitives/kpi-id.vo.js';
import type { IKpiResultService } from '../interfaces/kpi-result.service.interface.js';

export class KpiResultService extends BaseService<KpiResultEntity, string> implements IKpiResultService {
  readonly name = 'KpiResultService';

  constructor(private readonly repository: KpiResultRepository) {
    super();
  }

  async findByKpiId(kpiId: string): Promise<readonly KpiResultEntity[]> {
    return this.repository.findByKpiId(KpiIdVO.create(kpiId));
  }

  async findLatestByKpi(kpiId: string): Promise<KpiResultEntity | null> {
    return this.repository.findLatestByKpi(KpiIdVO.create(kpiId));
  }

  async findBreached(limit: number): Promise<readonly KpiResultEntity[]> {
    return this.repository.findBreached(limit);
  }
}
