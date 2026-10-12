/**
 * Dashboard Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { DashboardEntity } from '../entities/dashboard.entity.js';
import type { DashboardIdVO } from '../value-objects/primitives/dashboard-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export interface DashboardRepository extends BaseRepository<DashboardEntity, string> {
  findByDashboardId(id: DashboardIdVO): Promise<DashboardEntity | null>;
  findByOwner(ownerId: UserIdVO): Promise<readonly DashboardEntity[]>;
  findPublic(): Promise<readonly DashboardEntity[]>;
  findAccessibleBy(userId: UserIdVO): Promise<readonly DashboardEntity[]>;
  findArchived(): Promise<readonly DashboardEntity[]>;
  countByOwner(ownerId: UserIdVO): Promise<number>;
}
