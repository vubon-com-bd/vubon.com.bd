/**
 * TicketVO — Composite read-only view of ticket state
 * @module support-service/domain/value-objects/composites
 *
 * Registry: composite of ticket primitives
 * Rule: immutable, no entity reference, ID-only cross-service
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TicketIdVO } from '../primitives/ticket-id.vo';
import { TicketNumberVO } from '../primitives/ticket-number.vo';
import { TicketSubjectVO } from '../primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../primitives/ticket-description.vo';
import { TicketStatusVO } from '../primitives/ticket-status.vo';
import { TicketPriorityVO } from '../primitives/ticket-priority.vo';
import { TicketTypeVO } from '../primitives/ticket-type.vo';
import { TicketChannelVO } from '../primitives/ticket-channel.vo';
import { TicketCategoryIdVO } from '../primitives/ticket-category-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { ProductIdVO } from '../primitives/product-id.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface TicketVOProps {
  readonly id: TicketIdVO;
  readonly number: TicketNumberVO;
  readonly subject: TicketSubjectVO;
  readonly description: TicketDescriptionVO;
  readonly status: TicketStatusVO;
  readonly priority: TicketPriorityVO;
  readonly type: TicketTypeVO;
  readonly channel: TicketChannelVO;
  readonly categoryId?: TicketCategoryIdVO;
  readonly userId: UserIdVO;
  readonly orderId?: OrderIdVO;
  readonly productId?: ProductIdVO;
  readonly assignedAgentId?: AgentIdVO;
}

export class TicketVO extends BaseVO<Readonly<TicketVOProps>> {
  private constructor(props: TicketVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketVOProps): TicketVO {
    if (!props || typeof props !== 'object') {
      throw new ValidationError('TicketVO props required', 'ticket');
    }
    if (!props.id || !props.number || !props.subject) {
      throw new ValidationError(
        'TicketVO requires id, number and subject',
        'ticket',
      );
    }
    return new TicketVO(props);
  }

  get id(): TicketIdVO {
    return this.value.id;
  }

  get number(): TicketNumberVO {
    return this.value.number;
  }

  get subject(): TicketSubjectVO {
    return this.value.subject;
  }

  get status(): TicketStatusVO {
    return this.value.status;
  }

  get priority(): TicketPriorityVO {
    return this.value.priority;
  }

  get userId(): UserIdVO {
    return this.value.userId;
  }

  get isAssigned(): boolean {
    return this.value.assignedAgentId !== undefined;
  }

  get isOpen(): boolean {
    return this.value.status.isActive();
  }

  get isTerminal(): boolean {
    return this.value.status.isTerminal();
  }

  get isUrgent(): boolean {
    return this.value.priority.isUrgentOrHigher();
  }

  hasOrder(): boolean {
    return this.value.orderId !== undefined;
  }

  hasProduct(): boolean {
    return this.value.productId !== undefined;
  }
}
