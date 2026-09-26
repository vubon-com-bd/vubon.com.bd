/**
 * LiveChatVO — Live chat session composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { LiveChatIdVO } from '../primitives/live-chat-id.vo';
import { LiveChatStatusVO } from '../primitives/live-chat-status.vo';
import { LiveChatTypeVO } from '../primitives/live-chat-type.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface LiveChatVOProps {
  readonly id: LiveChatIdVO;
  readonly status: LiveChatStatusVO;
  readonly type: LiveChatTypeVO;
  readonly userId: UserIdVO;
  readonly agentId?: AgentIdVO;
  readonly startedAt: string;
}

export class LiveChatVO extends BaseVO<Readonly<LiveChatVOProps>> {
  private constructor(props: LiveChatVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LiveChatVOProps): LiveChatVO {
    if (!props.id || !props.userId) {
      throw new ValidationError(
        'LiveChatVO requires id and userId',
        'liveChat',
      );
    }
    if (typeof props.startedAt !== 'string' || props.startedAt.length === 0) {
      throw new ValidationError(
        'LiveChatVO startedAt required',
        'liveChat',
      );
    }
    return new LiveChatVO(props);
  }

  get id(): LiveChatIdVO {
    return this.value.id;
  }

  get status(): LiveChatStatusVO {
    return this.value.status;
  }

  get isActive(): boolean {
    return this.value.status.isActive();
  }

  get isTerminal(): boolean {
    return this.value.status.isTerminal();
  }

  get hasAgent(): boolean {
    return this.value.agentId !== undefined;
  }

  get isBotInvolved(): boolean {
    return this.value.type.isBotInvolved();
  }
}
