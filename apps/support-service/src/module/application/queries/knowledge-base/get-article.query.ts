import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetArticleQuery extends BaseQuery {
  readonly type = 'support.kb.get';

  constructor(public readonly articleId: string) {
    super();
  }
}
