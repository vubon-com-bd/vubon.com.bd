import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAuthMfaSettingsQuery extends BaseQuery {
  readonly type = 'auth.get-mfa-settings';

  constructor(public readonly userId: string) {
    super();
  }
}
