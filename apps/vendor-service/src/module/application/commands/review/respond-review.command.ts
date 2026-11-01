import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RespondReviewRequestDTO } from '../../dtos/requests/review/index.js';

export class RespondReviewCommand extends BaseCommand {
  readonly type = 'vendor.review.respond';
  constructor(
    public readonly dto: RespondReviewRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
