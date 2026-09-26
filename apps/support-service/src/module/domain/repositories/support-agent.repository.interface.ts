/**
 * SupportAgentRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SupportAgentEntity } from '../entities/support-agent.entity';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../value-objects/primitives/agent-type.vo';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SupportAgentRepository
  extends BaseRepository<SupportAgentEntity, AgentIdVO> {
  findByUser(userId: UserIdVO): Promise<SupportAgentEntity | null>;
  findByTeam(teamId: TeamIdVO): Promise<readonly SupportAgentEntity[]>;
  findByStatus(status: AgentStatusVO): Promise<readonly SupportAgentEntity[]>;
  findByType(type: AgentTypeVO): Promise<readonly SupportAgentEntity[]>;
  findAvailable(): Promise<readonly SupportAgentEntity[]>;
  findLeastLoaded(): Promise<readonly SupportAgentEntity[]>;
  findSupervisors(): Promise<readonly SupportAgentEntity[]>;
}
