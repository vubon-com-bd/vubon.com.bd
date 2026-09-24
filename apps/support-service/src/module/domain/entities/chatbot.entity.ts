import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';
import { ChatbotStatusVO } from '../value-objects/primitives/chatbot-status.vo';
import { ChatbotTypeVO } from '../value-objects/primitives/chatbot-type.vo';

export interface ChatbotEntityProps {
  readonly name: string;
  readonly status: ChatbotStatusVO;
  readonly type: ChatbotTypeVO;
  readonly config: Readonly<Record<string, unknown>> | null;
}

export class ChatbotEntity extends AggregateRoot<ChatbotIdVO> {
  private readonly _name: string;
  private readonly _status: ChatbotStatusVO;
  private readonly _type: ChatbotTypeVO;
  private readonly _config: Readonly<Record<string, unknown>> | null;

  private constructor(
    id: ChatbotIdVO,
    props: ChatbotEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._status = props.status;
    this._type = props.type;
    this._config = props.config ? Object.freeze({ ...props.config }) : null;
  }

  static create(props: ChatbotEntityProps): ChatbotEntity {
    const now = new Date().toISOString();
    const id = ChatbotIdVO.create(crypto.randomUUID());
    return new ChatbotEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ChatbotIdVO,
    props: ChatbotEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ChatbotEntity {
    return new ChatbotEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get status(): ChatbotStatusVO { return this._status; }
  get type(): ChatbotTypeVO { return this._type; }
  get config(): Readonly<Record<string, unknown>> | null { return this._config; }
}
