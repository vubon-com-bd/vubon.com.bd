/**
 * BroadcastResult Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { BroadcastResultEntity } from '@domain/entities/broadcast-result.entity.js';
import type { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';

export const BROADCAST_RESULT_REPOSITORY = Symbol('BROADCAST_RESULT_REPOSITORY');

export interface BroadcastResultRepository
  extends BaseRepository<BroadcastResultEntity, string> {
  findByBroadcast(broadcastId: BroadcastIdVO | string): Promise<BroadcastResultEntity | null>;
  findWithHighFailureRate(threshold: number): Promise<readonly BroadcastResultEntity[]>;
  findRecent(limit: number): Promise<readonly BroadcastResultEntity[]>;
  averageDeliveryRate(fromDate?: string, toDate?: string): Promise<number>;
  averageOpenRate(fromDate?: string, toDate?: string): Promise<number>;
}
