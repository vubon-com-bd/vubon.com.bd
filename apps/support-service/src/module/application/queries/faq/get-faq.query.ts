import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetFaqQuery extends BaseQuery {
  readonly type = 'support.faq.get';

  constructor(public readonly faqId: string) {
    super();
  }
}
