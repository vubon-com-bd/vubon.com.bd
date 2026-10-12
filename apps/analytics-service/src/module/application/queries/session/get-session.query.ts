import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetSessionQuery extends BaseQuery {
  readonly type = 'analytics.session.get';
  constructor(public readonly sessionId: string) { super(); }
}
