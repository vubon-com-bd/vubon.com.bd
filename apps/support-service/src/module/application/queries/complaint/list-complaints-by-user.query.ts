import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListComplaintsByUserQuery extends BaseQuery {
  readonly type = 'support.complaint.list-by-user';

  constructor(public readonly userId: string) {
    super();
  }
}
