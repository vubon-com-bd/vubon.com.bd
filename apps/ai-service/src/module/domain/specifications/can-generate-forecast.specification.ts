import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface ForecastCandidate {
  readonly target: string;
  readonly historicalPoints: number;
  readonly minPoints: number;
  readonly hasModel: boolean;
}

export class CanGenerateForecastSpecification
  extends Specification<ForecastCandidate>
{
  isSatisfiedBy(candidate: ForecastCandidate): boolean {
    if (!candidate.target || candidate.target.trim().length === 0) return false;
    if (!candidate.hasModel) return false;
    if (candidate.historicalPoints < candidate.minPoints) return false;
    return true;
  }
}
