/**
 * Funnel Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { FunnelEntity } from '../entities/funnel.entity.js';
import type { FunnelIdVO } from '../value-objects/primitives/funnel-id.vo.js';

export interface FunnelRepository extends BaseRepository<FunnelEntity, string> {
  findByFunnelId(id: FunnelIdVO): Promise<FunnelEntity | null>;
  findAllActive(): Promise<readonly FunnelEntity[]>;
  findByName(name: string): Promise<readonly FunnelEntity[]>;
}
