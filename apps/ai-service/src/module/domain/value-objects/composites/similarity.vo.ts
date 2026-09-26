import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SimilarityIdVO } from '../primitives/similarity-id.vo';
import { SimilarityThresholdVO } from '../primitives/similarity-threshold.vo';
import { VectorIdVO } from '../primitives/vector-id.vo';
import { SimilarityResultVO } from './similarity-result.vo';

export interface SimilarityProps {
  readonly id: SimilarityIdVO;
  readonly sourceVectorId: VectorIdVO;
  readonly targetVectorId: VectorIdVO;
  readonly metric: string;
  readonly threshold: SimilarityThresholdVO;
  readonly result: SimilarityResultVO;
}

export class SimilarityVO extends BaseVO<SimilarityProps> {
  static create(props: SimilarityProps): SimilarityVO {
    return new SimilarityVO(props);
  }

  private constructor(props: SimilarityProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): SimilarityIdVO { return this.value.id; }
  get sourceVectorId(): VectorIdVO { return this.value.sourceVectorId; }
  get targetVectorId(): VectorIdVO { return this.value.targetVectorId; }
  get metric(): string { return this.value.metric; }
  get threshold(): SimilarityThresholdVO { return this.value.threshold; }
  get result(): SimilarityResultVO { return this.value.result; }

  isStrict(): boolean {
    return this.value.threshold.isStrict();
  }
}
