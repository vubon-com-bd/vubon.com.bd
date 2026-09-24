import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSlaQuery extends BaseQuery {
  readonly type = 'support.sla.get';

  constructor(public readonly slaId: string) {
    super();
  }
}
