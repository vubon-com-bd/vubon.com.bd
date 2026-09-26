/**
 * FaqCategoryEntity — FAQ category aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<TicketCategoryIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';

export interface CreateFaqCategoryInput {
  readonly id: TicketCategoryIdVO;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly sortOrder?: number;
  readonly parentId?: TicketCategoryIdVO;
  readonly now: string;
}

export interface FaqCategorySnapshot {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly sortOrder: number;
  readonly parentId?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const NAME_MIN = 3;
const NAME_MAX = 100;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class FaqCategoryEntity extends AggregateRoot<TicketCategoryIdVO> {
  private _name: string;
  private _slug: string;
  private _description?: string;
  private _sortOrder: number;
  private readonly _parentId?: TicketCategoryIdVO;
  private _isActive: boolean;

  private constructor(
    id: TicketCategoryIdVO,
    name: string,
    slug: string,
    sortOrder: number,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    description?: string,
    parentId?: TicketCategoryIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._slug = slug;
    this._description = description;
    this._sortOrder = sortOrder;
    this._parentId = parentId;
    this._isActive = isActive;
  }

  static create(input: CreateFaqCategoryInput): FaqCategoryEntity {
    if (!input.id) {
      throw new ValidationError('FaqCategory id required', 'faqCategory');
    }
    const name = input.name?.trim();
    if (!name || name.length < NAME_MIN) {
      throw new ValidationError(
        `FaqCategory name too short (min ${NAME_MIN})`,
        'faqCategory',
      );
    }
    if (name.length > NAME_MAX) {
      throw new ValidationError(
        `FaqCategory name too long (max ${NAME_MAX})`,
        'faqCategory',
      );
    }
    const slug = input.slug?.trim().toLowerCase();
    if (!slug || !SLUG_PATTERN.test(slug)) {
      throw new ValidationError(
        'FaqCategory slug must be kebab-case',
        'faqCategory',
      );
    }
    const now = input.now;
    return new FaqCategoryEntity(
      input.id,
      name,
      slug,
      input.sortOrder ?? 0,
      true,
      now,
      now,
      input.description?.trim(),
      input.parentId,
    );
  }

  static rehydrate(snapshot: FaqCategorySnapshot): FaqCategoryEntity {
    return new FaqCategoryEntity(
      TicketCategoryIdVO.create(snapshot.id),
      snapshot.name,
      snapshot.slug,
      snapshot.sortOrder,
      snapshot.isActive,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.description,
      snapshot.parentId ? TicketCategoryIdVO.create(snapshot.parentId) : undefined,
    );
  }

  get name(): string {
    return this._name;
  }

  get slug(): string {
    return this._slug;
  }

  get description(): string | undefined {
    return this._description;
  }

  get sortOrder(): number {
    return this._sortOrder;
  }

  get parentId(): TicketCategoryIdVO | undefined {
    return this._parentId;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get isRoot(): boolean {
    return this._parentId === undefined;
  }

  rename(name: string, now: string): void {
    const trimmed = name.trim();
    if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) {
      throw new ValidationError('Invalid FaqCategory name', 'faqCategory');
    }
    this._name = trimmed;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  changeSortOrder(order: number, now: string): void {
    if (!Number.isInteger(order) || order < 0) {
      throw new ValidationError(
        'FaqCategory sortOrder must be non-negative integer',
        'faqCategory',
      );
    }
    this._sortOrder = order;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  deactivate(now: string): void {
    if (!this._isActive) {
      throw new BusinessRuleError(
        'FaqCategory already inactive',
        'faqCategory.already.inactive',
      );
    }
    this._isActive = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  activate(now: string): void {
    if (this._isActive) {
      throw new BusinessRuleError(
        'FaqCategory already active',
        'faqCategory.already.active',
      );
    }
    this._isActive = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  toSnapshot(): FaqCategorySnapshot {
    return {
      id: this.id.value,
      name: this._name,
      slug: this._slug,
      description: this._description,
      sortOrder: this._sortOrder,
      parentId: this._parentId?.value,
      isActive: this._isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
