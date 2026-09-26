import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyReviewCommand extends BaseSagaCommand {
  readonly type = 'saga.product.notify-review';

  constructor(
    public readonly userId: string,
    public readonly reviewId: string,
  ) {
    super();
  }
}
