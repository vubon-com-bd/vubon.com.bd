/**
 * ChatbotEntityVO — Chatbot slot/entity composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ChatbotEntityIdVO } from '../primitives/chatbot-entity-id.vo';

export type ChatbotEntityType = 'text' | 'number' | 'date' | 'email' | 'phone' | 'enum';

export interface ChatbotEntityVOProps {
  readonly id: ChatbotEntityIdVO;
  readonly name: string;
  readonly entityType: ChatbotEntityType;
  readonly required?: boolean;
  readonly enumValues?: readonly string[];
}

export class ChatbotEntityVO extends BaseVO<Readonly<ChatbotEntityVOProps>> {
  private constructor(props: ChatbotEntityVOProps) {
    super(
      Object.freeze({
        ...props,
        required: props.required ?? false,
        enumValues: props.enumValues ? Object.freeze([...props.enumValues]) : Object.freeze([]),
      }),
    );
  }

  static create(props: ChatbotEntityVOProps): ChatbotEntityVO {
    if (!props.id || !props.name || !props.entityType) {
      throw new ValidationError(
        'ChatbotEntityVO requires id, name, entityType',
        'chatbotEntity',
      );
    }
    if (props.entityType === 'enum' && (!props.enumValues || props.enumValues.length === 0)) {
      throw new ValidationError(
        'Enum entities require enumValues',
        'chatbotEntity',
      );
    }
    return new ChatbotEntityVO(props);
  }

  get id(): ChatbotEntityIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get entityType(): ChatbotEntityType {
    return this.value.entityType;
  }

  get isRequired(): boolean {
    return this.value.required === true;
  }

  get isEnum(): boolean {
    return this.value.entityType === 'enum';
  }
}
