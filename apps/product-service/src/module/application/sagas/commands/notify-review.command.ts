/**
 * NotifyReviewCommand — saga command
 * @module product-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyReviewCommand extends BaseSagaCommand {
  readonly type = 'product.saga.notify_review';

  constructor(
    public readonly userId: string,
    public readonly productId: string,
    public readonly reviewId: string,
    public readonly template: 'review_approved' | 'review_rejected' | 'review_replied',
    public readonly data: Readonly<Record<string, unknown>>,
    sagaId?: string,
  ) {
    super();
    if (sagaId) (this as { sagaId?: string }).sagaId = sagaId;
  }
}
