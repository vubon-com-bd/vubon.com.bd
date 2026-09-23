import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetLeadQuery extends BaseQuery {
  readonly type = 'marketing.lead.get';

  constructor(public readonly leadId: string) {
    super();
  }
}
