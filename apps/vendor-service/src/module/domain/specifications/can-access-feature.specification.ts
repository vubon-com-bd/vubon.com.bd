import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity';

export class CanAccessFeatureSpecification extends Specification<VendorEntity> {
  constructor(private readonly requiredTier: string) {
    super();
  }

  isSatisfiedBy(candidate: VendorEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value !== 'active') return false;

    const tierOrder: readonly string[] = [
      'bronze',
      'silver',
      'gold',
      'platinum',
      'diamond',
    ];
    const currentIndex = tierOrder.indexOf(candidate.tier.value);
    const requiredIndex = tierOrder.indexOf(this.requiredTier);

    return currentIndex >= requiredIndex;
  }
}
