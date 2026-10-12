import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class GetAuthSettingsQuery extends BaseQuery {
  readonly type = 'auth.get-settings';
  readonly queryType = 'auth.get-settings';
  constructor() { super(); }
}
