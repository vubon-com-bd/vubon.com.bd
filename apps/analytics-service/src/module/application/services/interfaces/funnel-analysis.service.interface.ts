/**
 * Funnel Analysis Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { FunnelAnalysisEntity } from '../../../domain/entities/funnel-analysis.entity.js';

export interface IFunnelAnalysisService extends BaseServiceInterface<FunnelAnalysisEntity, string> {
  findByFunnelId(funnelId: string): Promise<readonly FunnelAnalysisEntity[]>;
  findLatestByFunnel(funnelId: string): Promise<FunnelAnalysisEntity | null>;
}
