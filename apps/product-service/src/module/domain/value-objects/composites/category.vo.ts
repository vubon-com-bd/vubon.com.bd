/**
 * Category Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';
import { CATEGORY } from '@vubon/shared-constants/business';

import { CategoryIdVO } from '../primitives/category-id.vo.js';
import { CategoryNameVO } from '../primitives/category-name.vo.js';
import { CategorySlugVO } from '../primitives/category-slug.vo.js';
import { CategoryPathVO } from '../primitives/category-path.vo.js';

export interface CategoryVOProps {
  readonly id: CategoryIdVO;
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
}

export class CategoryVO extends BaseVO<CategoryVOProps> {
  private constructor(props: CategoryVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CategoryVOProps): CategoryVO {
    const vo = new CategoryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CategoryVOProps): CategoryVO {
    return new CategoryVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.description !== undefined) {
      if (v.description.length > CATEGORY.DESCRIPTION_MAX_LENGTH) {
        throw new ValidationError(
          `Category description exceeds ${CATEGORY.DESCRIPTION_MAX_LENGTH}`,
          'description',
        );
      }
    }

    if (v.imageUrl && !REGEX.URL.test(v.imageUrl)) {
      throw new ValidationError('Category imageUrl must be a valid URL', 'imageUrl');
    }
    if (v.iconUrl && !REGEX.URL.test(v.iconUrl)) {
      throw new ValidationError('Category iconUrl must be a valid URL', 'iconUrl');
    }

    if (!Number.isInteger(v.sortOrder)) {
      throw new ValidationError('Category sortOrder must be an integer', 'sortOrder');
    }
    if (!Number.isInteger(v.productCount) || v.productCount < 0) {
      throw new ValidationError('Category productCount must be non-negative integer', 'productCount');
    }

    if (v.path.depth > CATEGORY.MAX_DEPTH) {
      throw new ValidationError(`Category depth exceeds ${CATEGORY.MAX_DEPTH}`, 'path');
    }

    if (v.parentId === undefined && v.path.depth !== 1) {
      throw new ValidationError('Root category path must have depth 1', 'path');
    }

    if (v.parentId !== undefined) {
      if (v.path.depth < 2) {
        throw new ValidationError('Non-root category path must have depth >= 2', 'path');
      }
      const leaf = v.path.leafId;
      if (leaf !== v.id.value) {
        throw new ValidationError('Category path leaf must match category id', 'path');
      }
    }
  }

  get id(): CategoryIdVO { return this.value.id; }
  get name(): CategoryNameVO { return this.value.name; }
  get slug(): CategorySlugVO { return this.value.slug; }
  get description(): string | undefined { return this.value.description; }
  get parentId(): CategoryIdVO | undefined { return this.value.parentId; }
  get path(): CategoryPathVO { return this.value.path; }
  get status(): string { return this.value.status; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get iconUrl(): string | undefined { return this.value.iconUrl; }
  get sortOrder(): number { return this.value.sortOrder; }
  get productCount(): number { return this.value.productCount; }
  get isFeatured(): boolean { return this.value.isFeatured; }

  get depth(): number { return this.path.depth; }

  isRoot(): boolean { return this.parentId === undefined; }
  hasParent(): boolean { return this.parentId !== undefined; }
  hasImage(): boolean { return this.imageUrl !== undefined; }
  hasIcon(): boolean { return this.iconUrl !== undefined; }
  hasProducts(): boolean { return this.productCount > 0; }
  isActive(): boolean { return this.status === 'active'; }

  isAncestorOf(other: CategoryVO): boolean {
    return other.path.contains(this.id.value) && !other.id.equals(this.id);
  }

  isDescendantOf(other: CategoryVO): boolean {
    return this.path.contains(other.id.value) && !this.id.equals(other.id);
  }

  buildChildPath(): CategoryPathVO {
    return this.path.append(this.id.value);
  }
}
