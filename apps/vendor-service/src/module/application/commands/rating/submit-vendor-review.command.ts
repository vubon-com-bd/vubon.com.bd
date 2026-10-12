import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitReviewInput } from '../../services/interfaces/vendor-review.service.interface.js';

export class SubmitVendorReviewCommand extends BaseCommand {
  readonly type = 'vendor.review.submit';
  constructor(
    public readonly input: SubmitReviewInput,
    public readonly actorId?: string,
  ) { super(); }
}
