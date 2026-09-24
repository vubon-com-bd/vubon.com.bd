import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportTeamEntity } from '../entities/support-team.entity';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';

export interface SupportTeamRepository extends BaseRepository<SupportTeamEntity, TeamIdVO> {
  findActive(): Promise<readonly SupportTeamEntity[]>;
}
