import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CollectionIdVO } from '../primitives/collection-id.vo';
import { CollectionNameVO } from '../primitives/collection-name.vo';
import { CollectionTypeVO } from '../primitives/collection-type.vo';

export interface ProductCollectionProps {
  readonly id: CollectionIdVO;
  readonly name: CollectionNameVO;
  readonly type: CollectionTypeVO;
}

export class ProductCollectionVO extends BaseVO<ProductCollectionProps> {
  private constructor(props: ProductCollectionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductCollectionProps): ProductCollectionVO {
    return new ProductCollectionVO(props);
  }

  get id(): CollectionIdVO { return this.value.id; }
  get name(): CollectionNameVO { return this.value.name; }
  get type(): CollectionTypeVO { return this.value.type; }
}
