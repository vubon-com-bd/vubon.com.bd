import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetComplaintQuery extends BaseQuery {
  readonly type = 'support.complaint.get';

  constructor(public readonly complaintId: string) {
    super();
  }
}
