import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { FunnelAnalysisEntity } from '../../../domain/entities/funnel-analysis.entity';

export interface FunnelAnalysisServiceInterface
  extends BaseServiceInterface<FunnelAnalysisEntity, string> {
  findByFunnelId(funnelId: string): Promise<readonly FunnelAnalysisEntity[]>;
}
