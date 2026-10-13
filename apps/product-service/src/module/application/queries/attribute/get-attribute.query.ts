/**
 * GetAttributeQuery
 * @module product-service/application/queries/attribute
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetAttributeQuery extends BaseQuery {
  readonly type = 'product.attribute.get';
  constructor(public readonly attributeId: string) {
    super();
  }
}
