import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListMediaByProductQuery extends BaseQuery {
  readonly type = 'media.listByProduct';
  constructor(public readonly productId: string) { super(); }
}
