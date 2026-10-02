import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListVariantsByProductQuery extends BaseQuery {
  readonly type = 'variant.listByProduct';
  constructor(public readonly productId: string) { super(); }
}
