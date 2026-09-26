import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { InsightEntity } from '../../../domain/entities/insight.entity';
import type { InsightIdVO } from '../../../domain/value-objects/primitives/insight-id.vo';
import type { GenerateInsightRequestDTO } from '../../dtos/requests/insight/generate-insight.dto';
import type { DetectAnomalyRequestDTO } from '../../dtos/requests/insight/detect-anomaly.dto';
import type { InsightResponseDTO } from '../../dtos/responses/insight-response.dto';

export interface InsightServiceInterface
  extends BaseServiceInterface<InsightEntity, InsightIdVO> {
  generate(input: GenerateInsightRequestDTO): Promise<InsightResponseDTO>;
  detectAnomalies(input: DetectAnomalyRequestDTO): Promise<readonly { readonly timestamp: string; readonly value: number; readonly severity: string }[]>;
  dismiss(insightId: string): Promise<void>;
}
