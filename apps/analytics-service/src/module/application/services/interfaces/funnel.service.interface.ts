/**
 * Funnel Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { FunnelEntity } from '../../../domain/entities/funnel.entity.js';
import type { CreateFunnelDto } from '../../dtos/requests/funnel/create-funnel.dto.js';
import type { AnalyzeFunnelDto } from '../../dtos/requests/funnel/analyze-funnel.dto.js';
import type { FunnelResponseData } from '../../dtos/responses/funnel-response.dto.js';
import type { FunnelAnalysisResponseData } from '../../dtos/responses/funnel-analysis-response.dto.js';

export interface IFunnelService extends BaseServiceInterface<FunnelEntity, string> {
  create(input: CreateFunnelDto): Promise<FunnelResponseData>;
  analyze(id: string, input: AnalyzeFunnelDto): Promise<FunnelAnalysisResponseData>;
  findById(id: string): Promise<FunnelResponseData | null>;
  listActive(): Promise<readonly FunnelResponseData[]>;
}
