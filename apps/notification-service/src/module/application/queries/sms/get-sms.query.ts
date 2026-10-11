import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetSmsQuery extends BaseQuery {
  readonly type = 'sms.get';
  constructor(public readonly smsId: string) { super(); }
}
