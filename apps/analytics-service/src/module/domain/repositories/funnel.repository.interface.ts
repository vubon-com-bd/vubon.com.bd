import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FunnelEntity } from '../entities/funnel.entity';
import { FunnelIdVO } from '../value-objects/primitives/funnel-id.vo';

export interface FunnelRepository extends BaseRepository<FunnelEntity, FunnelIdVO> {
  findByName(name: string): Promise<FunnelEntity | null>;
}
