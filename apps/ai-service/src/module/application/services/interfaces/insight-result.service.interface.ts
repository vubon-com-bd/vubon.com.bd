import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { InsightResultEntity } from '../../../domain/entities/insight-result.entity';
import type { InsightIdVO } from '../../../domain/value-objects/primitives/insight-id.vo';

export interface InsightResultServiceInterface
  extends BaseServiceInterface<InsightResultEntity, InsightIdVO> {
  findByInsightId(insightId: string): Promise<InsightResultEntity | null>;
}
