import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ConversationEntity } from '../entities/conversation.entity';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface ConversationRepository extends BaseRepository<ConversationEntity, ConversationIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly ConversationEntity[]>;
  findActive(): Promise<readonly ConversationEntity[]>;
  findByAgent(agentId: AgentIdVO): Promise<readonly ConversationEntity[]>;
}
