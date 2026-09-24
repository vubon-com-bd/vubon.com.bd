import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPublishedFaqsQuery extends BaseQuery {
  readonly type = 'support.faq.list-published';

  constructor() {
    super();
  }
}
