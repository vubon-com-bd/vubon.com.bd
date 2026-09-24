import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportAgentEntity } from '../entities/support-agent.entity';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SupportAgentRepository extends BaseRepository<SupportAgentEntity, AgentIdVO> {
  findAvailable(): Promise<readonly SupportAgentEntity[]>;
  findByTeam(teamId: TeamIdVO): Promise<readonly SupportAgentEntity[]>;
  findByUser(userId: UserIdVO): Promise<SupportAgentEntity | null>;
}
