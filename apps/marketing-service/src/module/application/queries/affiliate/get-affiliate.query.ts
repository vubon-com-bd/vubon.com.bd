import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAffiliateQuery extends BaseQuery {
  readonly type = 'marketing.affiliate.get';

  constructor(public readonly affiliateId: string) {
    super();
  }
}
