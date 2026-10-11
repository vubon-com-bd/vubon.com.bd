import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetEmailQuery extends BaseQuery {
  readonly type = 'email.get';
  constructor(public readonly emailId: string) { super(); }
}
