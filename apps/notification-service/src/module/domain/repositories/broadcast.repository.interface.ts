import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { BroadcastEntity } from '../entities/broadcast.entity';
import { BroadcastIdVO } from '../value-objects/primitives/broadcast-id.vo';
import { BroadcastStatusVO } from '../value-objects/primitives/broadcast-status.vo';

export interface BroadcastRepository extends BaseRepository<BroadcastEntity, BroadcastIdVO> {
  findActive(): Promise<readonly BroadcastEntity[]>;
  findByStatus(status: BroadcastStatusVO): Promise<readonly BroadcastEntity[]>;
}
