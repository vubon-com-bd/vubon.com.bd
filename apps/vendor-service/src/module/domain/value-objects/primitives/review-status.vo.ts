import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VENDOR_REVIEW_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidReviewStatusError } from '../../errors/vendor.errors';

const VALID = new Set<string>(Object.values(VENDOR_REVIEW_STATUS));

export class ReviewStatusVO extends BaseVO<string> {
  static create(value: string): ReviewStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidReviewStatusError(value);
    }
    return new ReviewStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }

  isApproved(): boolean {
    return this.value === VENDOR_REVIEW_STATUS.APPROVED;
  }
}
