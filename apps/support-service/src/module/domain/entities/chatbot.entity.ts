/**
 * ChatbotEntity — Chatbot aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<ChatbotIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';
import { ChatbotStatusVO } from '../value-objects/primitives/chatbot-status.vo';
import { ChatbotTypeVO } from '../value-objects/primitives/chatbot-type.vo';
import { ChatbotIntentIdVO } from '../value-objects/primitives/chatbot-intent-id.vo';

export interface CreateChatbotInput {
  readonly id: ChatbotIdVO;
  readonly type: ChatbotTypeVO;
  readonly name: string;
  readonly language?: string;
  readonly confidenceThreshold?: number;
  readonly now: string;
}

export interface ChatbotSnapshot {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly name: string;
  readonly language: string;
  readonly confidenceThreshold: number;
  readonly intentIds: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class ChatbotEntity extends AggregateRoot<ChatbotIdVO> {
  private readonly _type: ChatbotTypeVO;
  private _status: ChatbotStatusVO;
  private _name: string;
  private readonly _language: string;
  private _confidenceThreshold: number;
  private _intentIds: readonly ChatbotIntentIdVO[];

  private constructor(
    id: ChatbotIdVO,
    type: ChatbotTypeVO,
    status: ChatbotStatusVO,
    name: string,
    language: string,
    confidenceThreshold: number,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._status = status;
    this._name = name;
    this._language = language;
    this._confidenceThreshold = confidenceThreshold;
    this._intentIds = Object.freeze([]);
  }

  static create(input: CreateChatbotInput): ChatbotEntity {
    if (!input.id || !input.name) {
      throw new ValidationError(
        'Chatbot requires id and name',
        'chatbot',
      );
    }
    const threshold = input.confidenceThreshold ?? 0.7;
    if (threshold < 0 || threshold > 1) {
      throw new ValidationError(
        'Chatbot confidenceThreshold must be between 0 and 1',
        'chatbot',
      );
    }
    const now = input.now;
    return new ChatbotEntity(
      input.id,
      input.type,
      ChatbotStatusVO.create('active'),
      input.name.trim(),
      input.language ?? 'en',
      threshold,
      now,
      now,
    );
  }

  static rehydrate(snapshot: ChatbotSnapshot): ChatbotEntity {
    const chatbot = new ChatbotEntity(
      ChatbotIdVO.create(snapshot.id),
      ChatbotTypeVO.create(snapshot.type),
      ChatbotStatusVO.create(snapshot.status),
      snapshot.name,
      snapshot.language,
      snapshot.confidenceThreshold,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
    chatbot._intentIds = Object.freeze(
      snapshot.intentIds.map((id) => ChatbotIntentIdVO.create(id)),
    );
    return chatbot;
  }

  get type(): ChatbotTypeVO {
    return this._type;
  }

  get status(): ChatbotStatusVO {
    return this._status;
  }

  get name(): string {
    return this._name;
  }

  get language(): string {
    return this._language;
  }

  get confidenceThreshold(): number {
    return this._confidenceThreshold;
  }

  get intentCount(): number {
    return this._intentIds.length;
  }

  get isOperational(): boolean {
    return this._status.isOperational();
  }

  get isAiPowered(): boolean {
    return this._type.isAiPowered();
  }

  meetsConfidence(score: number): boolean {
    return score >= this._confidenceThreshold;
  }

  registerIntent(intentId: ChatbotIntentIdVO, now: string): void {
    if (this._intentIds.some((i) => i.equals(intentId))) {
      throw new BusinessRuleError(
        'Intent already registered',
        'chatbot.intent.duplicate',
      );
    }
    this._intentIds = Object.freeze([...this._intentIds, intentId]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  removeIntent(intentId: ChatbotIntentIdVO, now: string): void {
    if (!this._intentIds.some((i) => i.equals(intentId))) return;
    this._intentIds = Object.freeze(this._intentIds.filter((i) => !i.equals(intentId)));
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  deactivate(now: string): void {
    if (!this.isOperational) {
      throw new BusinessRuleError('Chatbot already inactive', 'chatbot.already.inactive');
    }
    this._status = ChatbotStatusVO.create('inactive');
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  activate(now: string): void {
    if (this.isOperational) {
      throw new BusinessRuleError('Chatbot already active', 'chatbot.already.active');
    }
    this._status = ChatbotStatusVO.create('active');
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  toSnapshot(): ChatbotSnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      status: this._status.value,
      name: this._name,
      language: this._language,
      confidenceThreshold: this._confidenceThreshold,
      intentIds: this._intentIds.map((i) => i.value),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
