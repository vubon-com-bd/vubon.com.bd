import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ConversationIdVO } from '../primitives/conversation-id.vo';
import { ConversationStatusVO } from '../primitives/conversation-status.vo';
import { ConversationTypeVO } from '../primitives/conversation-type.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface ConversationProps {
  readonly id: ConversationIdVO;
  readonly userId: UserIdVO;
  readonly agentId: AgentIdVO | null;
  readonly status: ConversationStatusVO;
  readonly type: ConversationTypeVO;
  readonly startedAt: Date;
  readonly endedAt: Date | null;
}

export class ConversationVO extends BaseVO<ConversationProps> {
  private constructor(props: ConversationProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ConversationProps): ConversationVO {
    return new ConversationVO(props);
  }

  get id(): ConversationIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get agentId(): AgentIdVO | null { return this.value.agentId; }
  get status(): ConversationStatusVO { return this.value.status; }
  get type(): ConversationTypeVO { return this.value.type; }
  get startedAt(): Date { return this.value.startedAt; }
  get endedAt(): Date | null { return this.value.endedAt; }
}
