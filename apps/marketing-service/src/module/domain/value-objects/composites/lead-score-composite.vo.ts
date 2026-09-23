import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { LeadScoreVO } from '../primitives/lead-score.vo';
import { LeadSourceVO } from '../primitives/lead-source.vo';

export interface LeadScoreCompositeProps {
  readonly score: LeadScoreVO;
  readonly source: LeadSourceVO;
  readonly reason: string | null;
}

export class LeadScoreCompositeVO extends BaseVO<LeadScoreCompositeProps> {
  private constructor(props: LeadScoreCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: LeadScoreCompositeProps): LeadScoreCompositeVO {
    return new LeadScoreCompositeVO(props);
  }

  get score(): LeadScoreVO { return this.value.score; }
  get source(): LeadSourceVO { return this.value.source; }
  get reason(): string | null { return this.value.reason; }
}
