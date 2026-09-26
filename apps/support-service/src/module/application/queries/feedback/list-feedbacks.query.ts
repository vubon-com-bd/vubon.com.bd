/**
 * ListFeedbacksQuery
 * @module support-service/application/queries/feedback
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListFeedbacksQuery extends BaseQuery {
  readonly type = 'support.feedback.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
