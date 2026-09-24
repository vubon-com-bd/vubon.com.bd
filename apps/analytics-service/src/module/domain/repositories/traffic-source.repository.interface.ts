import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TrafficSourceEntity } from '../entities/traffic-source.entity';

export interface TrafficSourceRepository
  extends BaseRepository<TrafficSourceEntity, string> {
  findBySource(source: string): Promise<readonly TrafficSourceEntity[]>;
  findTopBySessions(limit: number): Promise<readonly TrafficSourceEntity[]>;
}
