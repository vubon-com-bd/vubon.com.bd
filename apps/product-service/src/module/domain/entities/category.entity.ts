/**
 * CategoryEntity — Aggregate Root (standalone)
 * @module product-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { CategoryVO } from '../value-objects/composites/category.vo.js';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo.js';
import { CategoryPathVO } from '../value-objects/primitives/category-path.vo.js';
import {
  CategoryCreatedEvent,
  CategoryMovedEvent,
  CategoryActivatedEvent,
  CategoryDeactivatedEvent,
  CategoryDeletedEvent,
} from '../events/category.events.js';

export class CategoryEntity extends AggregateRoot<string> {
  private _vo: CategoryVO;
  private _deletedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: CategoryVO,
    deletedBy?: string,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
    this._deletedBy = deletedBy;
  }

  get vo(): CategoryVO { return this._vo; }
  get categoryId(): CategoryVO['id'] { return this._vo.id; }
  get name(): CategoryVO['name'] { return this._vo.name; }
  get parentId(): CategoryIdVO | undefined { return this._vo.parentId; }
  get path(): CategoryPathVO { return this._vo.path; }
  get depth(): number { return this._vo.depth; }
  get isActive(): boolean { return this._vo.isActive(); }
  get deletedBy(): string | undefined { return this._deletedBy; }

  isRoot(): boolean { return this._vo.isRoot(); }

  moveTo(newParent: CategoryIdVO | undefined, newParentPath: CategoryPathVO | undefined, now: string = new Date().toISOString()): void {
    if (newParent && newParent.equals(this._vo.id)) {
      throw new BusinessRuleError(
        'Category cannot be its own parent',
        'CATEGORY_SELF_PARENT',
        { categoryId: this.id },
      );
    }
    if (newParentPath && newParentPath.contains(this._vo.id.value)) {
      throw new BusinessRuleError(
        'Cannot move category under its own descendant',
        'CATEGORY_CIRCULAR_REFERENCE',
        { categoryId: this.id, newParentId: newParent?.value },
      );
    }

    const newPath = newParentPath
      ? newParentPath.append(this._vo.id.value)
      : CategoryPathVO.create([this._vo.id.value]);

    this._vo = CategoryVO.create({
      ...this._vo.value,
      parentId: newParent,
      path: newPath,
    });

    this.addDomainEvent(
      new CategoryMovedEvent({
        aggregateId: this.id,
        payload: {
          categoryId: this.id,
          previousParentId: this.parentId?.value,
          newParentId: newParent?.value,
          newDepth: this._vo.depth,
          movedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  activate(now: string = new Date().toISOString()): void {
    if (this.isActive) return;
    this._vo = CategoryVO.create({ ...this._vo.value, status: 'active' });
    this.addDomainEvent(
      new CategoryActivatedEvent({
        aggregateId: this.id,
        payload: { categoryId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.isActive) return;
    this._vo = CategoryVO.create({ ...this._vo.value, status: 'inactive' });
    this.addDomainEvent(
      new CategoryDeactivatedEvent({
        aggregateId: this.id,
        payload: { categoryId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  delete(deletedBy?: string, now: string = new Date().toISOString()): void {
    if (this.deletedAt) return;
    this._vo = CategoryVO.create({ ...this._vo.value, status: 'deleted' });
    this._deletedBy = deletedBy;
    (this as unknown as { deletedAt: string | null }).deletedAt = now;
    this.addDomainEvent(
      new CategoryDeletedEvent({
        aggregateId: this.id,
        payload: { categoryId: this.id, deletedAt: now, deletedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: CategoryVO;
    now: string;
  }): CategoryEntity {
    const entity = new CategoryEntity(
      params.id,
      params.now,
      params.now,
      params.vo,
      undefined,
      null,
    );
    entity.addDomainEvent(
      new CategoryCreatedEvent({
        aggregateId: params.id,
        payload: {
          categoryId: params.id,
          name: params.vo.name.value,
          slug: params.vo.slug.value,
          parentId: params.vo.parentId?.value,
          depth: params.vo.depth,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: CategoryVO;
    deletedBy?: string;
    version?: number;
  }): CategoryEntity {
    const entity = new CategoryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedBy,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
