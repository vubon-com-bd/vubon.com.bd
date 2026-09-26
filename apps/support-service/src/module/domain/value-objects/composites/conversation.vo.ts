/**
 * ConversationVO — Composite view of a conversation
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ConversationIdVO } from '../primitives/conversation-id.vo';
import { ConversationStatusVO } from '../primitives/conversation-status.vo';
import { ConversationTypeVO } from '../primitives/conversation-type.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface ConversationVOProps {
  readonly id: ConversationIdVO;
  readonly status: ConversationStatusVO;
  readonly type: ConversationTypeVO;
  readonly userId: UserIdVO;
  readonly assignedAgentId?: AgentIdVO;
}

export class ConversationVO extends BaseVO<Readonly<ConversationVOProps>> {
  private constructor(props: ConversationVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ConversationVOProps): ConversationVO {
    if (!props.id || !props.userId) {
      throw new ValidationError(
        'ConversationVO requires id and userId',
        'conversation',
      );
    }
    return new ConversationVO(props);
  }

  get id(): ConversationIdVO {
    return this.value.id;
  }

  get status(): ConversationStatusVO {
    return this.value.status;
  }

  get type(): ConversationTypeVO {
    return this.value.type;
  }

  get isActive(): boolean {
    return this.value.status.canAcceptMessages();
  }

  get isRealtime(): boolean {
    return this.value.type.isRealtime();
  }

  get hasAgent(): boolean {
    return this.value.assignedAgentId !== undefined;
  }
}
