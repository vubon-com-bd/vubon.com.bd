import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAffiliateByCodeQuery extends BaseQuery {
  readonly type = 'marketing.affiliate.get-by-code';

  constructor(public readonly code: string) {
    super();
  }
}
