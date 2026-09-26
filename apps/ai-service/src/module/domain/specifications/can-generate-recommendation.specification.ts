import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface RecommendationCandidate {
  readonly userId: string;
  readonly hasHistory: boolean;
  readonly hasProducts: boolean;
  readonly isActive: boolean;
}

export class CanGenerateRecommendationSpecification
  extends Specification<RecommendationCandidate>
{
  isSatisfiedBy(candidate: RecommendationCandidate): boolean {
    if (!candidate.isActive) return false;
    if (!candidate.hasProducts) return false;
    if (!candidate.userId || candidate.userId.trim().length === 0) return false;
    return true;
  }
}
