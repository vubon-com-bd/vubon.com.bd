import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListFeedbackByUserQuery extends BaseQuery {
  readonly type = 'support.feedback.list-by-user';

  constructor(public readonly userId: string) {
    super();
  }
}
