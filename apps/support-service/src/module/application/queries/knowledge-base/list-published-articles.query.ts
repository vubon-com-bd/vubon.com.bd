import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPublishedArticlesQuery extends BaseQuery {
  readonly type = 'support.kb.list-published';

  constructor() {
    super();
  }
}
