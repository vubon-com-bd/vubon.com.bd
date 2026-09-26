import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AiAnalyticsEntity } from '../../../domain/entities/ai-analytics.entity';
import type { AiAnalyticsIdVO } from '../../../domain/value-objects/primitives/ai-analytics-id.vo';

export interface AiAnalyticsServiceInterface
  extends BaseServiceInterface<AiAnalyticsEntity, AiAnalyticsIdVO> {
  record(type: string, modelId: string | null, data: Readonly<Record<string, number>>): Promise<void>;
  findByType(type: string): Promise<readonly AiAnalyticsEntity[]>;
  getUsageSummary(fromDate?: string, toDate?: string): Promise<{ readonly totalCalls: number; readonly totalTokens: number; readonly totalCost: number }>;
}
