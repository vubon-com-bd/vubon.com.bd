import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ChatbotEntityIdVO } from '../value-objects/primitives/chatbot-entity-id.vo';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';

export interface ChatbotEntityEntityProps {
  readonly chatbotId: ChatbotIdVO;
  readonly name: string;
  readonly type: string;
  readonly value: string;
}

export class ChatbotEntityEntity extends BaseEntity<ChatbotEntityIdVO> {
  private readonly _chatbotId: ChatbotIdVO;
  private readonly _name: string;
  private readonly _type: string;
  private readonly _value: string;

  private constructor(
    id: ChatbotEntityIdVO,
    props: ChatbotEntityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._chatbotId = props.chatbotId;
    this._name = props.name;
    this._type = props.type;
    this._value = props.value;
  }

  static create(props: ChatbotEntityEntityProps): ChatbotEntityEntity {
    const now = new Date().toISOString();
    const id = ChatbotEntityIdVO.create(crypto.randomUUID());
    return new ChatbotEntityEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ChatbotEntityIdVO,
    props: ChatbotEntityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ChatbotEntityEntity {
    return new ChatbotEntityEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get chatbotId(): ChatbotIdVO { return this._chatbotId; }
  get name(): string { return this._name; }
  get type(): string { return this._type; }
  get value(): string { return this._value; }
}
