/**
 * Funnel Analysis Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { FunnelAnalysisEntity } from '../../../domain/entities/funnel-analysis.entity.js';
import type { FunnelAnalysisRepository } from '../../../domain/repositories/funnel-analysis.repository.interface.js';
import { FunnelIdVO } from '../../../domain/value-objects/primitives/funnel-id.vo.js';
import type { IFunnelAnalysisService } from '../interfaces/funnel-analysis.service.interface.js';

export class FunnelAnalysisService extends BaseService<FunnelAnalysisEntity, string> implements IFunnelAnalysisService {
  readonly name = 'FunnelAnalysisService';

  constructor(private readonly repository: FunnelAnalysisRepository) {
    super();
  }

  async findByFunnelId(funnelId: string): Promise<readonly FunnelAnalysisEntity[]> {
    return this.repository.findByFunnelId(FunnelIdVO.create(funnelId));
  }

  async findLatestByFunnel(funnelId: string): Promise<FunnelAnalysisEntity | null> {
    return this.repository.findLatestByFunnel(FunnelIdVO.create(funnelId));
  }
}
