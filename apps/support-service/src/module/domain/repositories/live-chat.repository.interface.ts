/**
 * LiveChatRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LiveChatEntity } from '../entities/live-chat.entity';
import { LiveChatIdVO } from '../value-objects/primitives/live-chat-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface LiveChatRepository
  extends BaseRepository<LiveChatEntity, LiveChatIdVO> {
  findActiveByUser(userId: UserIdVO): Promise<LiveChatEntity | null>;
  findActiveByAgent(agentId: AgentIdVO): Promise<readonly LiveChatEntity[]>;
  findActive(): Promise<readonly LiveChatEntity[]>;
  findUnassigned(): Promise<readonly LiveChatEntity[]>;
  findByUser(userId: UserIdVO): Promise<readonly LiveChatEntity[]>;
  countActiveByAgent(agentId: AgentIdVO): Promise<number>;
}
