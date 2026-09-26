/**
 * SupportTemplateEntity — Message template aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<TemplateIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../value-objects/primitives/template-type.vo';
import { TemplateContentVO } from '../value-objects/primitives/template-content.vo';

export interface CreateSupportTemplateInput {
  readonly id: TemplateIdVO;
  readonly type: TemplateTypeVO;
  readonly name: string;
  readonly content: TemplateContentVO;
  readonly language?: string;
  readonly now: string;
}

export interface SupportTemplateSnapshot {
  readonly id: string;
  readonly type: string;
  readonly name: string;
  readonly content: string;
  readonly language: string;
  readonly isActive: boolean;
  readonly usageCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const NAME_MIN = 2;
const NAME_MAX = 100;

export class SupportTemplateEntity extends AggregateRoot<TemplateIdVO> {
  private readonly _type: TemplateTypeVO;
  private _name: string;
  private _content: TemplateContentVO;
  private readonly _language: string;
  private _isActive: boolean;
  private _usageCount: number;

  private constructor(
    id: TemplateIdVO,
    type: TemplateTypeVO,
    name: string,
    content: TemplateContentVO,
    language: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._name = name;
    this._content = content;
    this._language = language;
    this._isActive = isActive;
    this._usageCount = 0;
  }

  static create(input: CreateSupportTemplateInput): SupportTemplateEntity {
    if (!input.id || !input.name) {
      throw new ValidationError(
        'SupportTemplate requires id and name',
        'supportTemplate',
      );
    }
    const name = input.name.trim();
    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      throw new ValidationError('Invalid SupportTemplate name', 'supportTemplate');
    }
    const now = input.now;
    return new SupportTemplateEntity(
      input.id,
      input.type,
      name,
      input.content,
      input.language ?? 'en',
      true,
      now,
      now,
    );
  }

  static rehydrate(snapshot: SupportTemplateSnapshot): SupportTemplateEntity {
    const template = new SupportTemplateEntity(
      TemplateIdVO.create(snapshot.id),
      TemplateTypeVO.create(snapshot.type),
      snapshot.name,
      TemplateContentVO.create(snapshot.content),
      snapshot.language,
      snapshot.isActive,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
    template._usageCount = snapshot.usageCount;
    return template;
  }

  get type(): TemplateTypeVO {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get content(): TemplateContentVO {
    return this._content;
  }

  get language(): string {
    return this._language;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get usageCount(): number {
    return this._usageCount;
  }

  get isCustomerFacing(): boolean {
    return this._type.isCustomerFacing();
  }

  get placeholders(): readonly string[] {
    return this._content.placeholders;
  }

  get hasPlaceholders(): boolean {
    return this._content.hasPlaceholders;
  }

  rename(name: string, now: string): void {
    const trimmed = name.trim();
    if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) {
      throw new ValidationError('Invalid SupportTemplate name', 'supportTemplate');
    }
    this._name = trimmed;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  updateContent(content: TemplateContentVO, now: string): void {
    this._content = content;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  render(values: Readonly<Record<string, string | number>>): string {
    if (this.hasPlaceholders && !this._content.hasAllValues(values)) {
      throw new BusinessRuleError(
        'Missing values for template placeholders',
        'supportTemplate.missing.values',
      );
    }
    this._usageCount += 1;
    return this._content.render(values);
  }

  deactivate(now: string): void {
    if (!this._isActive) return;
    this._isActive = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  activate(now: string): void {
    if (this._isActive) return;
    this._isActive = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  toSnapshot(): SupportTemplateSnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      name: this._name,
      content: this._content.value,
      language: this._language,
      isActive: this._isActive,
      usageCount: this._usageCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
