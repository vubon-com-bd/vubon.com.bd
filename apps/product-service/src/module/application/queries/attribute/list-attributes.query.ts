import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { AttributeListOptionsDTO } from '../../services/interfaces/product-attribute.service.interface.js';

export class ListAttributesQuery extends BaseQuery {
  readonly type = 'product.attribute.list';
  constructor(public readonly options: AttributeListOptionsDTO) {
    super();
  }
}
