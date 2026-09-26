/**
 * ChatbotIntentVO — Chatbot intent composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ChatbotIntentIdVO } from '../primitives/chatbot-intent-id.vo';

export interface ChatbotIntentVOProps {
  readonly id: ChatbotIntentIdVO;
  readonly name: string;
  readonly patterns: readonly string[];
  readonly response: string;
  readonly priority?: number;
}

export class ChatbotIntentVO extends BaseVO<Readonly<ChatbotIntentVOProps>> {
  private constructor(props: ChatbotIntentVOProps) {
    super(
      Object.freeze({
        ...props,
        patterns: Object.freeze([...props.patterns]),
        priority: props.priority ?? 0,
      }),
    );
  }

  static create(props: ChatbotIntentVOProps): ChatbotIntentVO {
    if (!props.id || !props.name || !props.response) {
      throw new ValidationError(
        'ChatbotIntentVO requires id, name, response',
        'chatbotIntent',
      );
    }
    if (!Array.isArray(props.patterns) || props.patterns.length === 0) {
      throw new ValidationError(
        'ChatbotIntentVO requires patterns',
        'chatbotIntent',
      );
    }
    return new ChatbotIntentVO(props);
  }

  get id(): ChatbotIntentIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get patternCount(): number {
    return this.value.patterns.length;
  }

  get priority(): number {
    return this.value.priority ?? 0;
  }

  matches(text: string): boolean {
    const lower = text.toLowerCase();
    return this.value.patterns.some((p) => lower.includes(p.toLowerCase()));
  }
}
