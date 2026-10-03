import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class GetAuthMfaSettingsQuery extends BaseQuery {
  readonly type = 'auth.get-mfa-settings';
  constructor(public readonly userId: UserId) { super(); }
}
