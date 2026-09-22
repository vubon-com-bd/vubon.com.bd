import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CategoryIdVO } from '../primitives/category-id.vo';
import { CategoryNameVO } from '../primitives/category-name.vo';
import { CategorySlugVO } from '../primitives/category-slug.vo';
import { CategoryPathVO } from '../primitives/category-path.vo';

export interface CategoryProps {
  readonly id: CategoryIdVO;
  readonly name: CategoryNameVO;
  readonly slug: CategorySlugVO;
  readonly path: CategoryPathVO;
  readonly parentId: CategoryIdVO | null;
}

export class CategoryVO extends BaseVO<CategoryProps> {
  private constructor(props: CategoryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CategoryProps): CategoryVO {
    return new CategoryVO(props);
  }

  get id(): CategoryIdVO { return this.value.id; }
  get name(): CategoryNameVO { return this.value.name; }
  get slug(): CategorySlugVO { return this.value.slug; }
  get path(): CategoryPathVO { return this.value.path; }
  get parentId(): CategoryIdVO | null { return this.value.parentId; }
}
