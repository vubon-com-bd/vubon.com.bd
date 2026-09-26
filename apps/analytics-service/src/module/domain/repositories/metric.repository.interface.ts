import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MetricEntity } from '../entities/metric.entity';
import { MetricIdVO } from '../value-objects/primitives/metric-id.vo';
import { MetricNameVO } from '../value-objects/primitives/metric-name.vo';

export interface MetricRepository extends BaseRepository<MetricEntity, MetricIdVO> {
  findByName(name: MetricNameVO): Promise<readonly MetricEntity[]>;
  findLatestByName(name: MetricNameVO): Promise<MetricEntity | null>;
  aggregateByName(
    name: MetricNameVO,
    startMs: number,
    endMs: number,
  ): Promise<number>;
}
