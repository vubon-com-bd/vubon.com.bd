import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo';
import { CategoryNameVO } from '../value-objects/primitives/category-name.vo';
import { CategorySlugVO } from '../value-objects/primitives/category-slug.vo';
import { CategoryPathVO } from '../value-objects/primitives/category-path.vo';
import {
  CategoryCreatedEvent,
  CategoryUpdatedEvent,
} from '../events/category.events';

export interface CategoryEntityProps {
  readonly name: CategoryNameVO;
  readonly slug: CategorySlugVO;
  readonly path: CategoryPathVO;
  readonly parentId: CategoryIdVO | null;
}

export class CategoryEntity extends AggregateRoot<CategoryIdVO> {
  private readonly _name: CategoryNameVO;
  private readonly _slug: CategorySlugVO;
  private readonly _path: CategoryPathVO;
  private readonly _parentId: CategoryIdVO | null;

  private constructor(
    id: CategoryIdVO,
    props: CategoryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._path = props.path;
    this._parentId = props.parentId;
  }

  static create(props: CategoryEntityProps): CategoryEntity {
    const now = new Date().toISOString();
    const id = CategoryIdVO.create(crypto.randomUUID());
    const entity = new CategoryEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CategoryCreatedEvent(id.value, id.value, props.name.value, props.slug.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: CategoryIdVO,
    props: CategoryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CategoryEntity {
    return new CategoryEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeName(name: CategoryNameVO): CategoryEntity {
    const updated = new CategoryEntity(
      this.id,
      { ...this._toProps(), name },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CategoryUpdatedEvent(this.id.value, this.id.value, ['name'], this.version + 1),
    );
    return updated;
  }

  moveTo(parentId: CategoryIdVO | null, newPath: CategoryPathVO): CategoryEntity {
    if (parentId && parentId.value === this.id.value) {
      throw new Error('Category cannot be its own parent');
    }
    const updated = new CategoryEntity(
      this.id,
      { ...this._toProps(), parentId, path: newPath },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CategoryUpdatedEvent(this.id.value, this.id.value, ['parentId', 'path'], this.version + 1),
    );
    return updated;
  }

  get name(): CategoryNameVO { return this._name; }
  get slug(): CategorySlugVO { return this._slug; }
  get path(): CategoryPathVO { return this._path; }
  get parentId(): CategoryIdVO | null { return this._parentId; }

  isRoot(): boolean {
    return this._parentId === null;
  }

  private _toProps(): CategoryEntityProps {
    return {
      name: this._name,
      slug: this._slug,
      path: this._path,
      parentId: this._parentId,
    };
  }
}
