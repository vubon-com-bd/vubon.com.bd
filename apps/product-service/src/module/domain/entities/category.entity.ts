/**
 * CategoryEntity — Aggregate Root
 * @module product-service/domain/entities
 *
 * Business rules:
 * - Depth cannot exceed CATEGORY.MAX_DEPTH
 * - Cannot move to own descendant
 * - Cannot delete with children
 * - Path maintained via append/drop operations
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CATEGORY, CATEGORY_STATUS } from '@vubon/shared-constants/business/product';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo.js';
import { CategoryNameVO } from '../value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../value-objects/primitives/category-path.vo.js';
import {
  CategoryCreatedEvent,
  CategoryUpdatedEvent,
  CategoryMovedEvent,
  CategoryDeletedEvent,
} from '../events/category.events.js';

export interface CategoryEntityProps {
  readonly name: CategoryNameVO;
  readonly slug: CategorySlugVO;
  readonly description?: string;
  readonly parentId?: CategoryIdVO;
  readonly path: CategoryPathVO;
  readonly status: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly sortOrder: number;
  readonly productCount: number;
  readonly isFeatured: boolean;
  readonly hasChildren: boolean;
}

export class CategoryEntity extends AggregateRoot<string> {
  private _name: CategoryNameVO;
  private _slug: CategorySlugVO;
  private _description?: string;
  private _parentId?: CategoryIdVO;
  private _path: CategoryPathVO;
  private _status: string;
  private _imageUrl?: string;
  private _iconUrl?: string;
  private _sortOrder: number;
  private _productCount: number;
  private _isFeatured: boolean;
  private _hasChildren: boolean;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CategoryEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._description = props.description;
    this._parentId = props.parentId;
    this._path = props.path;
    this._status = props.status;
    this._imageUrl = props.imageUrl;
    this._iconUrl = props.iconUrl;
    this._sortOrder = props.sortOrder;
    this._productCount = props.productCount;
    this._isFeatured = props.isFeatured;
    this._hasChildren = props.hasChildren;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._description && this._description.length > CATEGORY.DESCRIPTION_MAX_LENGTH) {
      throw new ValidationError('Description too long', 'description');
    }
    if (this._sortOrder < 0) {
      throw new ValidationError('sortOrder cannot be negative', 'sortOrder');
    }
    if (this._productCount < 0) {
      throw new ValidationError('productCount cannot be negative', 'productCount');
    }
    if (this._path.depth > CATEGORY.MAX_DEPTH) {
      throw new BusinessRuleError(
        `Category depth ${this._path.depth} exceeds max ${CATEGORY.MAX_DEPTH}`,
        'CATEGORY_DEPTH_EXCEEDED',
      );
    }
  }

  // Getters
  get name(): CategoryNameVO { return this._name; }
  get slug(): CategorySlugVO { return this._slug; }
  get description(): string | undefined { return this._description; }
  get parentId(): CategoryIdVO | undefined { return this._parentId; }
  get path(): CategoryPathVO { return this._path; }
  get status(): string { return this._status; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get iconUrl(): string | undefined { return this._iconUrl; }
  get sortOrder(): number { return this._sortOrder; }
  get productCount(): number { return this._productCount; }
  get isFeatured(): boolean { return this._isFeatured; }
  get hasChildren(): boolean { return this._hasChildren; }
  get depth(): number { return this._path.depth; }

  // Business methods
  public rename(name: CategoryNameVO, slug: CategorySlugVO, changedBy: string): void {
    const changedFields: string[] = [];
    if (!name.equals(this._name)) { this._name = name; changedFields.push('name'); }
    if (!slug.equals(this._slug)) { this._slug = slug; changedFields.push('slug'); }
    if (changedFields.length === 0) return;

    this.addDomainEvent(new CategoryUpdatedEvent({
      aggregateId: this.id,
      payload: { categoryId: this.id, changedFields },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  public updateMedia(params: {
    imageUrl?: string;
    iconUrl?: string;
    description?: string;
    sortOrder?: number;
    isFeatured?: boolean;
  }, changedBy: string): void {
    const changedFields: string[] = [];
    if (params.imageUrl !== undefined) { this._imageUrl = params.imageUrl; changedFields.push('imageUrl'); }
    if (params.iconUrl !== undefined) { this._iconUrl = params.iconUrl; changedFields.push('iconUrl'); }
    if (params.description !== undefined) { this._description = params.description; changedFields.push('description'); }
    if (params.sortOrder !== undefined) {
      if (params.sortOrder < 0) throw new ValidationError('sortOrder negative', 'sortOrder');
      this._sortOrder = params.sortOrder;
      changedFields.push('sortOrder');
    }
    if (params.isFeatured !== undefined) { this._isFeatured = params.isFeatured; changedFields.push('isFeatured'); }

    if (changedFields.length === 0) return;

    this.addDomainEvent(new CategoryUpdatedEvent({
      aggregateId: this.id,
      payload: { categoryId: this.id, changedFields },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  public moveTo(params: {
    newParentId: CategoryIdVO | undefined;
    newParentPath: CategoryPathVO;
    changedBy: string;
  }): void {
    // Cannot move to itself
    if (params.newParentId?.value === this.id) {
      throw new BusinessRuleError('Category cannot be its own parent', 'CATEGORY_SELF_PARENT');
    }
    // Cannot move into own descendant
    if (params.newParentId && this._path.contains(params.newParentId.value)) {
      throw new BusinessRuleError(
        'Cannot move category into its own descendant',
        'CATEGORY_MOVE_INTO_DESCENDANT',
      );
    }

    const newPath = params.newParentId
      ? params.newParentPath.append(this.id)
      : CategoryPathVO.create([this.id]);

    if (newPath.depth > CATEGORY.MAX_DEPTH) {
      throw new BusinessRuleError(
        `Move would exceed max depth ${CATEGORY.MAX_DEPTH}`,
        'CATEGORY_DEPTH_EXCEEDED',
      );
    }

    const oldParentId = this._parentId?.value;
    const oldDepth = this._path.depth;
    this._parentId = params.newParentId;
    this._path = newPath;

    this.addDomainEvent(new CategoryMovedEvent({
      aggregateId: this.id,
      payload: {
        categoryId: this.id,
        oldParentId,
        newParentId: params.newParentId?.value,
        oldDepth,
        newDepth: newPath.depth,
      },
      version: this.version + 1,
      metadata: { userId: params.changedBy },
    }));
    this.incrementVersion();
  }

  public activate(changedBy: string): void {
    if (this._status === CATEGORY_STATUS.ACTIVE) return;
    this._status = CATEGORY_STATUS.ACTIVE;
    this.incrementVersion();
    void changedBy;
  }

  public deactivate(changedBy: string): void {
    if (this._status === CATEGORY_STATUS.INACTIVE) return;
    this._status = CATEGORY_STATUS.INACTIVE;
    this.incrementVersion();
    void changedBy;
  }

  public hide(): void {
    this._status = CATEGORY_STATUS.HIDDEN;
    this.incrementVersion();
  }

  public softDelete(deletedBy: string): void {
    if (this._hasChildren) {
      throw new BusinessRuleError(
        `Category "${this.id}" has children and cannot be deleted`,
        'CATEGORY_HAS_CHILDREN',
        { categoryId: this.id },
      );
    }
    this._status = CATEGORY_STATUS.DELETED;
    this.addDomainEvent(new CategoryDeletedEvent({
      aggregateId: this.id,
      payload: { categoryId: this.id, deletedBy },
      version: this.version + 1,
      metadata: { userId: deletedBy },
    }));
    this.incrementVersion();
  }

  public incrementProductCount(): void {
    this._productCount += 1;
  }

  public decrementProductCount(): void {
    this._productCount = Math.max(0, this._productCount - 1);
  }

  public markHasChildren(value: boolean): void {
    this._hasChildren = value;
  }

  // Queries
  public isRoot(): boolean {
    return !this._parentId;
  }

  public isLeaf(): boolean {
    return !this._hasChildren;
  }

  public isActive(): boolean {
    return this._status === CATEGORY_STATUS.ACTIVE && !this.isDeleted();
  }

  public canHaveChildren(): boolean {
    return this.depth < CATEGORY.MAX_DEPTH;
  }

  public toIdVO(): CategoryIdVO {
    return CategoryIdVO.reconstitute(this.id);
  }

  // Factories
  public static create(params: {
    id: string;
    props: CategoryEntityProps;
    now: string;
  }): CategoryEntity {
    const entity = new CategoryEntity(params.id, params.now, params.now, params.props);
    entity.addDomainEvent(new CategoryCreatedEvent({
      aggregateId: params.id,
      payload: {
        categoryId: params.id,
        name: params.props.name.value,
        slug: params.props.slug.value,
        parentId: params.props.parentId?.value,
        depth: params.props.path.depth,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CategoryEntityProps;
  }): CategoryEntity {
    return new CategoryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
