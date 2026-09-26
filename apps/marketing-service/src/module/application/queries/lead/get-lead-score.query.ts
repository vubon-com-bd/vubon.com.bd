import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetLeadScoreQuery extends BaseQuery {
  readonly type = 'marketing.lead.get-score';

  constructor(public readonly leadId: string) {
    super();
  }
}
