/**
 * SubmitReviewCommand
 * @module vendor-service/application/commands/review
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitReviewRequestDTO } from '../../dtos/requests/review/index.js';

export class SubmitReviewCommand extends BaseCommand {
  readonly type = 'vendor.review.submit';
  constructor(
    public readonly dto: SubmitReviewRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
