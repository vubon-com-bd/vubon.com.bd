/**
 * ChatbotVO — Chatbot configuration composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ChatbotIdVO } from '../primitives/chatbot-id.vo';
import { ChatbotStatusVO } from '../primitives/chatbot-status.vo';
import { ChatbotTypeVO } from '../primitives/chatbot-type.vo';

export interface ChatbotVOProps {
  readonly id: ChatbotIdVO;
  readonly status: ChatbotStatusVO;
  readonly type: ChatbotTypeVO;
  readonly name: string;
  readonly language?: string;
  readonly confidenceThreshold?: number;
}

export class ChatbotVO extends BaseVO<Readonly<ChatbotVOProps>> {
  private constructor(props: ChatbotVOProps) {
    super(
      Object.freeze({
        ...props,
        language: props.language ?? 'en',
        confidenceThreshold: props.confidenceThreshold ?? 0.7,
      }),
    );
  }

  static create(props: ChatbotVOProps): ChatbotVO {
    if (!props.id || !props.name) {
      throw new ValidationError(
        'ChatbotVO requires id and name',
        'chatbot',
      );
    }
    const threshold = props.confidenceThreshold ?? 0.7;
    if (threshold < 0 || threshold > 1) {
      throw new ValidationError(
        'ChatbotVO confidenceThreshold must be between 0 and 1',
        'chatbot',
      );
    }
    return new ChatbotVO(props);
  }

  get id(): ChatbotIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get isOperational(): boolean {
    return this.value.status.isOperational();
  }

  get isAiPowered(): boolean {
    return this.value.type.isAiPowered();
  }

  get confidenceThreshold(): number {
    return this.value.confidenceThreshold ?? 0.7;
  }

  meetsConfidence(score: number): boolean {
    return score >= this.confidenceThreshold;
  }
}
