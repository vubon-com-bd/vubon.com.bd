import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ChatbotIntentIdVO } from '../value-objects/primitives/chatbot-intent-id.vo';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';

export interface ChatbotIntentEntityProps {
  readonly chatbotId: ChatbotIdVO;
  readonly name: string;
  readonly patterns: ReadonlyArray<string>;
  readonly response: string;
}

export class ChatbotIntentEntity extends BaseEntity<ChatbotIntentIdVO> {
  private readonly _chatbotId: ChatbotIdVO;
  private readonly _name: string;
  private readonly _patterns: ReadonlyArray<string>;
  private readonly _response: string;

  private constructor(
    id: ChatbotIntentIdVO,
    props: ChatbotIntentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._chatbotId = props.chatbotId;
    this._name = props.name;
    this._patterns = Object.freeze([...props.patterns]);
    this._response = props.response;
  }

  static create(props: ChatbotIntentEntityProps): ChatbotIntentEntity {
    const now = new Date().toISOString();
    const id = ChatbotIntentIdVO.create(crypto.randomUUID());
    return new ChatbotIntentEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ChatbotIntentIdVO,
    props: ChatbotIntentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ChatbotIntentEntity {
    return new ChatbotIntentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get chatbotId(): ChatbotIdVO { return this._chatbotId; }
  get name(): string { return this._name; }
  get patterns(): ReadonlyArray<string> { return this._patterns; }
  get response(): string { return this._response; }
}
