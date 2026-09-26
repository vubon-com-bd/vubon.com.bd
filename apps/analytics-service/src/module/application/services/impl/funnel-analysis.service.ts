import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { FunnelAnalysisEntity } from '../../../domain/entities/funnel-analysis.entity';
import { FunnelIdVO } from '../../../domain/value-objects/primitives/funnel-id.vo';
import type { FunnelAnalysisRepository } from '../../../domain/repositories/funnel-analysis.repository.interface';
import type { FunnelAnalysisServiceInterface } from '../interfaces/funnel-analysis.service.interface';

@Injectable()
export class FunnelAnalysisService
  extends BaseService<FunnelAnalysisEntity, string>
  implements FunnelAnalysisServiceInterface
{
  readonly name = 'FunnelAnalysisService';

  constructor(private readonly repo: FunnelAnalysisRepository) {
    super();
  }

  async findByFunnelId(funnelId: string): Promise<readonly FunnelAnalysisEntity[]> {
    return this.repo.findByFunnelId(FunnelIdVO.create(funnelId));
  }
}
