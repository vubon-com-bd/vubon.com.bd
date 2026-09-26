/**
 * ChatbotIntentEntity — Chatbot intent
 * @module support-service/domain/entities
 *
 * Registry: extends BaseEntity<ChatbotIntentIdVO>
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ChatbotIntentIdVO } from '../value-objects/primitives/chatbot-intent-id.vo';

export interface CreateChatbotIntentInput {
  readonly id: ChatbotIntentIdVO;
  readonly name: string;
  readonly patterns: readonly string[];
  readonly response: string;
  readonly priority?: number;
  readonly now: string;
}

export interface ChatbotIntentSnapshot {
  readonly id: string;
  readonly name: string;
  readonly patterns: readonly string[];
  readonly response: string;
  readonly priority: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const NAME_MIN = 2;
const NAME_MAX = 100;
const MAX_PATTERNS = 50;

export class ChatbotIntentEntity extends BaseEntity<ChatbotIntentIdVO> {
  private _name: string;
  private _patterns: readonly string[];
  private _response: string;
  private _priority: number;

  private constructor(
    id: ChatbotIntentIdVO,
    name: string,
    patterns: readonly string[],
    response: string,
    priority: number,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._patterns = Object.freeze([...patterns]);
    this._response = response;
    this._priority = priority;
  }

  static create(input: CreateChatbotIntentInput): ChatbotIntentEntity {
    if (!input.id || !input.name) {
      throw new ValidationError(
        'ChatbotIntent requires id and name',
        'chatbotIntent',
      );
    }
    const name = input.name.trim();
    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      throw new ValidationError('Invalid ChatbotIntent name', 'chatbotIntent');
    }
    const patterns = ChatbotIntentEntity.normalizePatterns(input.patterns);
    if (typeof input.response !== 'string' || input.response.trim().length === 0) {
      throw new ValidationError('ChatbotIntent response required', 'chatbotIntent');
    }
    const now = input.now;
    return new ChatbotIntentEntity(
      input.id,
      name,
      patterns,
      input.response.trim(),
      input.priority ?? 0,
      now,
      now,
    );
  }

  static rehydrate(snapshot: ChatbotIntentSnapshot): ChatbotIntentEntity {
    return new ChatbotIntentEntity(
      ChatbotIntentIdVO.create(snapshot.id),
      snapshot.name,
      snapshot.patterns,
      snapshot.response,
      snapshot.priority,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
  }

  private static normalizePatterns(patterns: readonly string[]): readonly string[] {
    if (!Array.isArray(patterns) || patterns.length === 0) {
      throw new ValidationError(
        'ChatbotIntent requires at least one pattern',
        'chatbotIntent',
      );
    }
    if (patterns.length > MAX_PATTERNS) {
      throw new ValidationError(
        `ChatbotIntent supports max ${MAX_PATTERNS} patterns`,
        'chatbotIntent',
      );
    }
    const unique = new Set<string>();
    for (const p of patterns) {
      const trimmed = p?.trim().toLowerCase();
      if (!trimmed) continue;
      unique.add(trimmed);
    }
    if (unique.size === 0) {
      throw new ValidationError(
        'ChatbotIntent patterns must be non-empty',
        'chatbotIntent',
      );
    }
    return Object.freeze(Array.from(unique));
  }

  get name(): string {
    return this._name;
  }

  get patterns(): readonly string[] {
    return this._patterns;
  }

  get response(): string {
    return this._response;
  }

  get priority(): number {
    return this._priority;
  }

  get patternCount(): number {
    return this._patterns.length;
  }

  matches(text: string): boolean {
    if (typeof text !== 'string') return false;
    const lower = text.toLowerCase();
    return this._patterns.some((p) => lower.includes(p));
  }

  addPattern(pattern: string, now: string): void {
    const trimmed = pattern.trim().toLowerCase();
    if (!trimmed) {
      throw new ValidationError('Pattern cannot be empty', 'chatbotIntent');
    }
    if (this._patterns.includes(trimmed)) return;
    if (this._patterns.length >= MAX_PATTERNS) {
      throw new ValidationError(
        `ChatbotIntent supports max ${MAX_PATTERNS} patterns`,
        'chatbotIntent',
      );
    }
    this._patterns = Object.freeze([...this._patterns, trimmed]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  toSnapshot(): ChatbotIntentSnapshot {
    return {
      id: this.id.value,
      name: this._name,
      patterns: this._patterns,
      response: this._response,
      priority: this._priority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
