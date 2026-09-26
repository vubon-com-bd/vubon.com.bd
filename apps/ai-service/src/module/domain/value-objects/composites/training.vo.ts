import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TrainingIdVO } from '../primitives/training-id.vo';
import { ModelIdVO } from '../primitives/model-id.vo';
import { TrainingConfigVO } from './training-config.vo';
import { TrainingJobVO } from './training-job.vo';

export interface TrainingProps {
  readonly id: TrainingIdVO;
  readonly modelId: ModelIdVO;
  readonly config: TrainingConfigVO;
  readonly job: TrainingJobVO;
}

export class TrainingVO extends BaseVO<TrainingProps> {
  static create(props: TrainingProps): TrainingVO {
    return new TrainingVO(props);
  }

  private constructor(props: TrainingProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): TrainingIdVO { return this.value.id; }
  get modelId(): ModelIdVO { return this.value.modelId; }
  get config(): TrainingConfigVO { return this.value.config; }
  get job(): TrainingJobVO { return this.value.job; }

  isRunning(): boolean {
    return this.value.job.isRunning();
  }
}
