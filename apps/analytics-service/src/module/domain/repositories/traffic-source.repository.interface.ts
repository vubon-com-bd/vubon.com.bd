/**
 * Traffic Source Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { TrafficSourceEntity } from '../entities/traffic-source.entity.js';

export interface TrafficSourceRepository extends BaseRepository<TrafficSourceEntity, string> {
  findByChannelKey(channelKey: string): Promise<TrafficSourceEntity | null>;
  findAllPaid(): Promise<readonly TrafficSourceEntity[]>;
  findAllOrganic(): Promise<readonly TrafficSourceEntity[]>;
  findWithCampaigns(): Promise<readonly TrafficSourceEntity[]>;
  findTopByOccurrence(limit: number): Promise<readonly TrafficSourceEntity[]>;
}
