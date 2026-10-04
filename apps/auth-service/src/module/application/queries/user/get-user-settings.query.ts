import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class GetUserSettingsQuery extends BaseQuery {
  readonly type = 'user.get-settings';
  constructor(public readonly userId: UserId) { super(); }
}
