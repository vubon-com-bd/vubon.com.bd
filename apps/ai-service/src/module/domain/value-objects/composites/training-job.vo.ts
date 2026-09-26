import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TrainingIdVO } from '../primitives/training-id.vo';
import { TrainingStatusVO } from '../primitives/training-status.vo';
import { TrainingTypeVO } from '../primitives/training-type.vo';

export interface TrainingJobProps {
  readonly id: TrainingIdVO;
  readonly type: TrainingTypeVO;
  readonly status: TrainingStatusVO;
  readonly progress: number;
  readonly startedAt: Date | null;
  readonly completedAt: Date | null;
  readonly errorMessage: string | null;
}

export class TrainingJobVO extends BaseVO<TrainingJobProps> {
  static create(props: TrainingJobProps): TrainingJobVO {
    if (props.progress < 0 || props.progress > 100) {
      throw new Error('TrainingJob: progress must be in [0, 100]');
    }
    return new TrainingJobVO(props);
  }

  private constructor(props: TrainingJobProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): TrainingIdVO { return this.value.id; }
  get type(): TrainingTypeVO { return this.value.type; }
  get status(): TrainingStatusVO { return this.value.status; }
  get progress(): number { return this.value.progress; }
  get startedAt(): Date | null { return this.value.startedAt; }
  get completedAt(): Date | null { return this.value.completedAt; }
  get errorMessage(): string | null { return this.value.errorMessage; }

  isRunning(): boolean {
    return this.value.status.isRunning();
  }

  isComplete(): boolean {
    return this.value.status.isCompleted();
  }

  getDurationMs(): number {
    if (!this.value.startedAt || !this.value.completedAt) return 0;
    return this.value.completedAt.getTime() - this.value.startedAt.getTime();
  }
}
