/**
 * Metric Aggregation Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { MetricAggregationEntity } from '../../../domain/entities/metric-aggregation.entity.js';
import type { MetricAggregationRepository } from '../../../domain/repositories/metric-aggregation.repository.interface.js';
import type { IMetricAggregationService } from '../interfaces/metric-aggregation.service.interface.js';

export class MetricAggregationService extends BaseService<MetricAggregationEntity, string> implements IMetricAggregationService {
  readonly name = 'MetricAggregationService';

  constructor(private readonly repository: MetricAggregationRepository) {
    super();
  }

  async findByKey(key: string): Promise<MetricAggregationEntity | null> {
    return this.repository.findByAggregationKey(key);
  }

  async save(entity: MetricAggregationEntity): Promise<MetricAggregationEntity> {
    return this.repository.save(entity);
  }

  async bulkSave(entities: readonly MetricAggregationEntity[]): Promise<number> {
    return this.repository.bulkUpsert(entities);
  }
}
