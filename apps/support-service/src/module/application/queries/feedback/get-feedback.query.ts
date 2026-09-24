import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetFeedbackQuery extends BaseQuery {
  readonly type = 'support.feedback.get';

  constructor(public readonly feedbackId: string) {
    super();
  }
}
