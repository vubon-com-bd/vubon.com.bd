import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LiveChatIdVO } from '../primitives/live-chat-id.vo';
import { LiveChatStatusVO } from '../primitives/live-chat-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface LiveChatProps {
  readonly id: LiveChatIdVO;
  readonly userId: UserIdVO;
  readonly agentId: AgentIdVO | null;
  readonly status: LiveChatStatusVO;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
}

export class LiveChatVO extends BaseVO<LiveChatProps> {
  private constructor(props: LiveChatProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LiveChatProps): LiveChatVO {
    return new LiveChatVO(props);
  }

  get id(): LiveChatIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get agentId(): AgentIdVO | null { return this.value.agentId; }
  get status(): LiveChatStatusVO { return this.value.status; }
  get startedAt(): Date { return this.value.startedAt; }
  get endedAt(): Date | null { return this.value.endedAt; }
}
