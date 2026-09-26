import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetEventQuery extends BaseQuery {
  readonly type = 'analytics.event.get';

  constructor(public readonly eventId: string) {
    super();
  }
}
