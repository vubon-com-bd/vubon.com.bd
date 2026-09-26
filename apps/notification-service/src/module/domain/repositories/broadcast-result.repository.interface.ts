import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { BroadcastResultEntity } from '../entities/broadcast-result.entity';

export interface BroadcastResultRepository extends BaseRepository<BroadcastResultEntity, string> {
  findByBroadcastId(broadcastId: string): Promise<readonly BroadcastResultEntity[]>;
  countByStatus(broadcastId: string, status: string): Promise<number>;
}
