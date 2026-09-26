/**
 * Live Chat Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { LiveChatIdVO } from '../value-objects/primitives/live-chat-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

interface MetaFields {
  readonly id: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

const meta = (
  aggregateId: string,
  aggregateType: string,
  version: number,
  occurredAt: number,
): MetaFields => ({
  id: `${aggregateId}-${version}-${occurredAt}`,
  aggregateId,
  aggregateType,
  occurredAt: toTimestamp(occurredAt),
  version,
});

export interface ChatStartedPayload {
  readonly userId: string;
  readonly type: string;
}

export class ChatStartedEvent extends BaseDomainEvent<
  'support.livechat.started',
  ChatStartedPayload
> {
  constructor(
    id: LiveChatIdVO,
    userId: UserIdVO,
    type: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'live-chat', version, occurredAt),
      type: 'support.livechat.started',
      payload: { userId: userId.value, type },
    });
  }
}

export interface AgentJoinedPayload {
  readonly agentId: string;
}

export class AgentJoinedEvent extends BaseDomainEvent<
  'support.livechat.agent_joined',
  AgentJoinedPayload
> {
  constructor(
    id: LiveChatIdVO,
    agentId: AgentIdVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'live-chat', version, occurredAt),
      type: 'support.livechat.agent_joined',
      payload: { agentId: agentId.value },
    });
  }
}

export interface ChatEndedPayload {
  readonly reason?: string;
  readonly durationMinutes?: number;
}

export class ChatEndedEvent extends BaseDomainEvent<
  'support.livechat.ended',
  ChatEndedPayload
> {
  constructor(
    id: LiveChatIdVO,
    occurredAt: number,
    reason?: string,
    durationMinutes?: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'live-chat', version, occurredAt),
      type: 'support.livechat.ended',
      payload: { reason, durationMinutes },
    });
  }
}
