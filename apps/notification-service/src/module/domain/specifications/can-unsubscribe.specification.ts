import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PreferenceMatrixEntity } from '../entities/preference-matrix.entity';

export interface CanUnsubscribeCandidate {
  readonly preferences: PreferenceMatrixEntity;
  readonly channel: string;
}

export class CanUnsubscribeSpecification extends Specification<CanUnsubscribeCandidate> {
  isSatisfiedBy(candidate: CanUnsubscribeCandidate): boolean {
    if (candidate.channel === 'security') return false;
    return candidate.preferences.isOptedIn(candidate.channel);
  }
}
