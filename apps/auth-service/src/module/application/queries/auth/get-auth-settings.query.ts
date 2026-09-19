import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAuthSettingsQuery extends BaseQuery {
  readonly type = 'auth.get-settings';

  constructor(public readonly userId: string) {
    super();
  }
}
