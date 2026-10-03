import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListAttributesByProductQuery extends BaseQuery {
  readonly type = 'attribute.listByProduct';
  constructor(public readonly productId: string) { super(); }
}
