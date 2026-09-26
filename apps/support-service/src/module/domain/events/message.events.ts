/**
 * Message Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { MessageTypeVO } from '../value-objects/primitives/message-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

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

export interface MessageSentPayload {
  readonly authorId: string;
  readonly type: string;
  readonly length: number;
}

export class MessageSentEvent extends BaseDomainEvent<
  'support.message.sent',
  MessageSentPayload
> {
  constructor(
    id: MessageIdVO,
    authorId: UserIdVO,
    type: MessageTypeVO,
    length: number,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'message', version, occurredAt),
      type: 'support.message.sent',
      payload: { authorId: authorId.value, type: type.value, length },
    });
  }
}

export interface MessageReadPayload {
  readonly readerId: string;
}

export class MessageReadEvent extends BaseDomainEvent<
  'support.message.read',
  MessageReadPayload
> {
  constructor(
    id: MessageIdVO,
    readerId: UserIdVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'message', version, occurredAt),
      type: 'support.message.read',
      payload: { readerId: readerId.value },
    });
  }
}
