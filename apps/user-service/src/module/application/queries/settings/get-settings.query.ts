import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSettingsQuery extends BaseQuery {
  readonly type = 'user.settings.get';

  constructor(public readonly userId: string) {
    super();
  }
}
