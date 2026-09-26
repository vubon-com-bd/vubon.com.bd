/**
 * ListComplaintsQuery
 * @module support-service/application/queries/complaint
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListComplaintsQuery extends BaseQuery {
  readonly type = 'support.complaint.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
