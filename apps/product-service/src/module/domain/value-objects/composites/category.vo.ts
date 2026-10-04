/**
 * CategoryCompositeVO
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CategoryIdVO } from '../primitives/category-id.vo.js';
import { CategoryNameVO } from '../primitives/category-name.vo.js';
import { CategorySlugVO } from '../primitives/category-slug.vo.js';
import { CategoryPathVO } from '../primitives/category-path.vo.js';
import { CATEGORY } from '@vubon/shared-constants/business/product';

export interface CategoryCompositeProps {
  readonly id: CategoryIdVO;
  readonly name: CategoryNameVO;
  readonly slug: CategorySlugVO;
  readonly path: CategoryPathVO;
  readonly parentId?: CategoryIdVO;
  readonly status: string;
  readonly sortOrder: number;
  readonly productCount: number;
}

export class CategoryCompositeVO extends BaseVO<CategoryCompositeProps> {
  private constructor(props: CategoryCompositeProps) {
    super(props);
  }

  static create(props: CategoryCompositeProps): CategoryCompositeVO {
    if (props.sortOrder < 0) {
      throw new Error('Category sortOrder cannot be negative');
    }
    if (props.productCount < 0) {
      throw new Error('Category productCount cannot be negative');
    }
    return new CategoryCompositeVO(props);
  }

  static reconstitute(props: CategoryCompositeProps): CategoryCompositeVO {
    return new CategoryCompositeVO(props);
  }

  get id(): CategoryIdVO { return this.value.id; }
  get name(): CategoryNameVO { return this.value.name; }
  get slug(): CategorySlugVO { return this.value.slug; }
  get path(): CategoryPathVO { return this.value.path; }
  get parentId(): CategoryIdVO | undefined { return this.value.parentId; }
  get status(): string { return this.value.status; }
  get sortOrder(): number { return this.value.sortOrder; }
  get productCount(): number { return this.value.productCount; }

  isRoot(): boolean {
    return !this.value.parentId;
  }

  isLeaf(): boolean {
    return this.value.productCount > 0;
  }

  getDepth(): number {
    return this.value.path.depth;
  }

  canHaveChildren(): boolean {
    return this.getDepth() < CATEGORY.MAX_DEPTH;
  }

  isActive(): boolean {
    return this.value.status === 'active';
  }
}
