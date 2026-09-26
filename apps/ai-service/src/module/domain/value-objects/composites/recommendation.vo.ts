import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RecommendationIdVO } from '../primitives/recommendation-id.vo';
import { RecommendationTypeVO } from '../primitives/recommendation-type.vo';
import { RecommendationStrategyVO } from '../primitives/recommendation-strategy.vo';
import { RecommendationStatusVO } from '../primitives/recommendation-status.vo';
import { RecommendationContextVO } from './recommendation-context.vo';
import { RecommendationResultVO } from './recommendation-result.vo';

export interface RecommendationProps {
  readonly id: RecommendationIdVO;
  readonly type: RecommendationTypeVO;
  readonly strategy: RecommendationStrategyVO;
  readonly status: RecommendationStatusVO;
  readonly context: RecommendationContextVO;
  readonly result: RecommendationResultVO;
}

export class RecommendationVO extends BaseVO<RecommendationProps> {
  static create(props: RecommendationProps): RecommendationVO {
    return new RecommendationVO(props);
  }

  private constructor(props: RecommendationProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): RecommendationIdVO { return this.value.id; }
  get type(): RecommendationTypeVO { return this.value.type; }
  get strategy(): RecommendationStrategyVO { return this.value.strategy; }
  get status(): RecommendationStatusVO { return this.value.status; }
  get context(): RecommendationContextVO { return this.value.context; }
  get result(): RecommendationResultVO { return this.value.result; }

  isPersonalized(): boolean {
    return this.value.type.isPersonalized();
  }

  hasResults(): boolean {
    return this.value.result.size() > 0;
  }
}
