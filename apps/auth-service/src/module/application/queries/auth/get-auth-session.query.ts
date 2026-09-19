import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAuthSessionQuery extends BaseQuery {
  readonly type = 'auth.get-session';

  constructor(public readonly sessionId: string) {
    super();
  }
}
