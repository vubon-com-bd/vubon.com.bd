import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

const VALID = new Set<string>([
  'pending',
  'approved',
  'rejected',
  'flagged',
]);

export class ReviewStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReviewStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidValueError('review_status', `Invalid review status: ${raw}`);
    }
    return new ReviewStatusVO(raw);
  }

  isApproved(): boolean { return this.value === 'approved'; }
  isPending(): boolean { return this.value === 'pending'; }
}
