import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RouteEntity } from '../entities/route.entity';
import { RouteIdVO } from '../value-objects/primitives/route-id.vo';

export interface RouteRepository
  extends BaseRepository<RouteEntity, RouteIdVO> {
  findOptimized(): Promise<readonly RouteEntity[]>;
  findActive(): Promise<readonly RouteEntity[]>;
}
