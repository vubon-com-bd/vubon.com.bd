import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSessionQuery extends BaseQuery {
  readonly type = 'analytics.session.get';

  constructor(public readonly sessionId: string) {
    super();
  }
}
