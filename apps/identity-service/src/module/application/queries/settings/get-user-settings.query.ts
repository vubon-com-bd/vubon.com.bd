import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class GetUserSettingsNewQuery extends BaseQuery {
  readonly type = 'user.get-settings-v2';
  readonly queryType = 'user.get-settings-v2';
  constructor(public readonly userId: string) { super(); }
}
