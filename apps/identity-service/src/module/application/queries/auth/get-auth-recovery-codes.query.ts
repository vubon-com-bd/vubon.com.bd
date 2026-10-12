import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class GetAuthRecoveryCodesQuery extends BaseQuery {
  readonly type = 'auth.get-recovery-codes';
  readonly queryType = 'auth.get-recovery-codes';
  constructor(public readonly authId: string) { super(); }
}
