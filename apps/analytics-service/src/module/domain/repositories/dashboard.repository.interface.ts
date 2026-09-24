import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DashboardEntity } from '../entities/dashboard.entity';
import { DashboardIdVO } from '../value-objects/primitives/dashboard-id.vo';

export interface DashboardRepository
  extends BaseRepository<DashboardEntity, DashboardIdVO> {
  findByOwner(ownerId: string): Promise<readonly DashboardEntity[]>;
  findByNameForOwner(ownerId: string, name: string): Promise<DashboardEntity | null>;
}
