/**
 * SupportTeamRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportTeamEntity } from '../entities/support-team.entity';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../value-objects/primitives/team-name.vo';
import { TeamTypeVO } from '../value-objects/primitives/team-type.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface SupportTeamRepository
  extends BaseRepository<SupportTeamEntity, TeamIdVO> {
  findByName(name: TeamNameVO): Promise<SupportTeamEntity | null>;
  findActive(): Promise<readonly SupportTeamEntity[]>;
  findByType(type: TeamTypeVO): Promise<readonly SupportTeamEntity[]>;
  findByMember(agentId: AgentIdVO): Promise<readonly SupportTeamEntity[]>;
}
