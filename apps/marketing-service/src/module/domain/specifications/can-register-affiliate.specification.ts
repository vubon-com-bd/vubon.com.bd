import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { AffiliateEntity } from '../entities/affiliate.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export class CanRegisterAffiliateSpecification extends Specification<{
  affiliate: AffiliateEntity | null;
  userId: UserIdVO;
}> {
  isSatisfiedBy(candidate: {
    affiliate: AffiliateEntity | null;
    userId: UserIdVO;
  }): boolean {
    return candidate.affiliate === null;
  }
}
