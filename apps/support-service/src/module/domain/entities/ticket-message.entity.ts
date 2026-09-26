/**
 * TicketMessageEntity — Message posted on a ticket
 * @module support-service/domain/entities
 *
 * Registry: extends BaseEntity<MessageIdVO>
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../value-objects/primitives/message-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { AttachmentIdVO } from '../value-objects/primitives/attachment-id.vo';

export interface CreateTicketMessageInput {
  readonly id: MessageIdVO;
  readonly ticketId: TicketIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly authorUserId?: UserIdVO;
  readonly authorAgentId?: AgentIdVO;
  readonly attachmentIds?: readonly AttachmentIdVO[];
  readonly isInternal?: boolean;
  readonly now: string;
}

export interface TicketMessageSnapshot {
  readonly id: string;
  readonly ticketId: string;
  readonly content: string;
  readonly type: string;
  readonly status: string;
  readonly authorUserId?: string;
  readonly authorAgentId?: string;
  readonly attachmentIds?: readonly string[];
  readonly isInternal: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TicketMessageEntity extends BaseEntity<MessageIdVO> {
  private _content: MessageContentVO;
  private _status: MessageStatusVO;
  private readonly _type: MessageTypeVO;
  private readonly _ticketId: TicketIdVO;
  private readonly _authorUserId?: UserIdVO;
  private readonly _authorAgentId?: AgentIdVO;
  private _attachmentIds: readonly AttachmentIdVO[];
  private readonly _isInternal: boolean;

  private constructor(
    id: MessageIdVO,
    ticketId: TicketIdVO,
    content: MessageContentVO,
    type: MessageTypeVO,
    status: MessageStatusVO,
    createdAt: string,
    updatedAt: string,
    isInternal: boolean,
    authorUserId?: UserIdVO,
    authorAgentId?: AgentIdVO,
    attachmentIds?: readonly AttachmentIdVO[],
  ) {
    super(id, createdAt, updatedAt);
    this._ticketId = ticketId;
    this._content = content;
    this._type = type;
    this._status = status;
    this._isInternal = isInternal;
    this._authorUserId = authorUserId;
    this._authorAgentId = authorAgentId;
    this._attachmentIds = attachmentIds ? Object.freeze([...attachmentIds]) : Object.freeze([]);
  }

  static create(input: CreateTicketMessageInput): TicketMessageEntity {
    if (!input.id || !input.ticketId || !input.content) {
      throw new ValidationError(
        'TicketMessage requires id, ticketId, content',
        'ticketMessage',
      );
    }
    if (!input.authorUserId && !input.authorAgentId) {
      throw new ValidationError(
        'TicketMessage requires an author (user or agent)',
        'ticketMessage',
      );
    }
    if (input.isInternal && input.authorUserId) {
      throw new ValidationError(
        'Internal messages cannot be authored by a customer',
        'ticketMessage',
      );
    }
    const now = input.now;
    return new TicketMessageEntity(
      input.id,
      input.ticketId,
      input.content,
      input.type,
      MessageStatusVO.create('sent'),
      now,
      now,
      input.isInternal ?? false,
      input.authorUserId,
      input.authorAgentId,
      input.attachmentIds,
    );
  }

  static rehydrate(snapshot: TicketMessageSnapshot): TicketMessageEntity {
    return new TicketMessageEntity(
      MessageIdVO.create(snapshot.id),
      TicketIdVO.create(snapshot.ticketId),
      MessageContentVO.create(snapshot.content),
      MessageTypeVO.create(snapshot.type),
      MessageStatusVO.create(snapshot.status),
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.isInternal,
      snapshot.authorUserId ? UserIdVO.create(snapshot.authorUserId) : undefined,
      snapshot.authorAgentId ? AgentIdVO.create(snapshot.authorAgentId) : undefined,
      snapshot.attachmentIds?.map((id) => AttachmentIdVO.create(id)),
    );
  }

  get ticketId(): TicketIdVO {
    return this._ticketId;
  }

  get content(): MessageContentVO {
    return this._content;
  }

  get type(): MessageTypeVO {
    return this._type;
  }

  get status(): MessageStatusVO {
    return this._status;
  }

  get authorUserId(): UserIdVO | undefined {
    return this._authorUserId;
  }

  get authorAgentId(): AgentIdVO | undefined {
    return this._authorAgentId;
  }

  get isInternal(): boolean {
    return this._isInternal;
  }

  get isFromAgent(): boolean {
    return this._authorAgentId !== undefined;
  }

  get isFromCustomer(): boolean {
    return this._authorUserId !== undefined;
  }

  get attachmentCount(): number {
    return this._attachmentIds.length;
  }

  get hasAttachments(): boolean {
    return this._attachmentIds.length > 0;
  }

  edit(newContent: MessageContentVO, now: string): void {
    if (this._isInternal) {
      throw new ValidationError(
        'Internal notes cannot be edited after posting',
        'ticketMessage',
      );
    }
    if (this._status.isRead()) {
      throw new ValidationError(
        'Read messages cannot be edited',
        'ticketMessage',
      );
    }
    this._content = newContent;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  markDelivered(): void {
    this._status = MessageStatusVO.create('delivered');
  }

  markRead(): void {
    this._status = MessageStatusVO.create('read');
  }

  attach(attachmentId: AttachmentIdVO): void {
    if (this._attachmentIds.some((a) => a.equals(attachmentId))) {
      return;
    }
    this._attachmentIds = Object.freeze([...this._attachmentIds, attachmentId]);
  }

  toSnapshot(): TicketMessageSnapshot {
    return {
      id: this.id.value,
      ticketId: this._ticketId.value,
      content: this._content.value,
      type: this._type.value,
      status: this._status.value,
      authorUserId: this._authorUserId?.value,
      authorAgentId: this._authorAgentId?.value,
      attachmentIds: this._attachmentIds.map((a) => a.value),
      isInternal: this._isInternal,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
