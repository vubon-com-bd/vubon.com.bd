import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { KpiResultEntity } from '../../../domain/entities/kpi-result.entity';
import { KpiIdVO } from '../../../domain/value-objects/primitives/kpi-id.vo';
import type { KpiResultRepository } from '../../../domain/repositories/kpi-result.repository.interface';
import type { KpiResultServiceInterface } from '../interfaces/kpi-result.service.interface';

@Injectable()
export class KpiResultService
  extends BaseService<KpiResultEntity, string>
  implements KpiResultServiceInterface
{
  readonly name = 'KpiResultService';

  constructor(private readonly repo: KpiResultRepository) {
    super();
  }

  async findByKpiId(kpiId: string): Promise<readonly KpiResultEntity[]> {
    return this.repo.findByKpiId(KpiIdVO.create(kpiId));
  }
}
