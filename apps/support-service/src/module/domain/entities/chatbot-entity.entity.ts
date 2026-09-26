/**
 * ChatbotEntityEntity — Chatbot slot/entity (aka "entity" in NLP)
 * @module support-service/domain/entities
 *
 * Registry: extends BaseEntity<ChatbotEntityIdVO>
 * Note: file named chatbot-entity.entity.ts to avoid confusion with DomainEntity
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ChatbotEntityIdVO } from '../value-objects/primitives/chatbot-entity-id.vo';

export type ChatbotSlotType = 'text' | 'number' | 'date' | 'email' | 'phone' | 'enum';

export interface CreateChatbotSlotInput {
  readonly id: ChatbotEntityIdVO;
  readonly name: string;
  readonly entityType: ChatbotSlotType;
  readonly required?: boolean;
  readonly enumValues?: readonly string[];
  readonly now: string;
}

export interface ChatbotSlotSnapshot {
  readonly id: string;
  readonly name: string;
  readonly entityType: ChatbotSlotType;
  readonly required: boolean;
  readonly enumValues: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

const NAME_MIN = 2;
const NAME_MAX = 100;
const MAX_ENUM = 50;

export class ChatbotSlotEntity extends BaseEntity<ChatbotEntityIdVO> {
  private _name: string;
  private readonly _entityType: ChatbotSlotType;
  private _required: boolean;
  private _enumValues: readonly string[];

  private constructor(
    id: ChatbotEntityIdVO,
    name: string,
    entityType: ChatbotSlotType,
    required: boolean,
    enumValues: readonly string[],
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._entityType = entityType;
    this._required = required;
    this._enumValues = Object.freeze([...enumValues]);
  }

  static create(input: CreateChatbotSlotInput): ChatbotSlotEntity {
    if (!input.id || !input.name || !input.entityType) {
      throw new ValidationError(
        'ChatbotSlot requires id, name, entityType',
        'chatbotSlot',
      );
    }
    const name = input.name.trim();
    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      throw new ValidationError('Invalid ChatbotSlot name', 'chatbotSlot');
    }
    let enumValues: readonly string[] = Object.freeze([]);
    if (input.entityType === 'enum') {
      if (!Array.isArray(input.enumValues) || input.enumValues.length === 0) {
        throw new ValidationError(
          'Enum slot requires enumValues',
          'chatbotSlot',
        );
      }
      if (input.enumValues.length > MAX_ENUM) {
        throw new ValidationError(
          `ChatbotSlot supports max ${MAX_ENUM} enum values`,
          'chatbotSlot',
        );
      }
      const unique = new Set(input.enumValues.map((v) => v.trim()).filter(Boolean));
      enumValues = Object.freeze(Array.from(unique));
    }
    const now = input.now;
    return new ChatbotSlotEntity(
      input.id,
      name,
      input.entityType,
      input.required ?? false,
      enumValues,
      now,
      now,
    );
  }

  static rehydrate(snapshot: ChatbotSlotSnapshot): ChatbotSlotEntity {
    return new ChatbotSlotEntity(
      ChatbotEntityIdVO.create(snapshot.id),
      snapshot.name,
      snapshot.entityType,
      snapshot.required,
      snapshot.enumValues,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
  }

  get name(): string {
    return this._name;
  }

  get entityType(): ChatbotSlotType {
    return this._entityType;
  }

  get isRequired(): boolean {
    return this._required;
  }

  get enumValues(): readonly string[] {
    return this._enumValues;
  }

  get isEnum(): boolean {
    return this._entityType === 'enum';
  }

  isValidValue(value: string): boolean {
    if (typeof value !== 'string' || value.trim().length === 0) return false;
    if (this._entityType === 'number') return !Number.isNaN(Number(value));
    if (this._entityType === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (this._entityType === 'phone') return /^\+?\d{7,15}$/.test(value.trim());
    if (this._entityType === 'date') return !Number.isNaN(Date.parse(value));
    if (this._entityType === 'enum') return this._enumValues.includes(value.trim());
    return true;
  }

  markRequired(now: string): void {
    if (this._required) return;
    this._required = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  markOptional(now: string): void {
    if (!this._required) return;
    this._required = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  toSnapshot(): ChatbotSlotSnapshot {
    return {
      id: this.id.value,
      name: this._name,
      entityType: this._entityType,
      required: this._required,
      enumValues: this._enumValues,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
