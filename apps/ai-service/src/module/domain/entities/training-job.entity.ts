import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TrainingIdVO } from '../value-objects/primitives/training-id.vo';
import { TrainingStatusVO } from '../value-objects/primitives/training-status.vo';
import { TrainingTypeVO } from '../value-objects/primitives/training-type.vo';

export interface TrainingJobEntityProps {
  readonly type: TrainingTypeVO;
  readonly status: TrainingStatusVO;
  readonly progress: number;
  readonly startedAt: Date | null;
  readonly completedAt: Date | null;
  readonly errorMessage: string | null;
}

export class TrainingJobEntity extends AggregateRoot<TrainingIdVO> {
  private readonly _type: TrainingTypeVO;
  private readonly _status: TrainingStatusVO;
  private readonly _progress: number;
  private readonly _startedAt: Date | null;
  private readonly _completedAt: Date | null;
  private readonly _errorMessage: string | null;

  private constructor(
    id: TrainingIdVO,
    props: TrainingJobEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._status = props.status;
    this._progress = props.progress;
    this._startedAt = props.startedAt;
    this._completedAt = props.completedAt;
    this._errorMessage = props.errorMessage;
  }

  static create(props: TrainingJobEntityProps): TrainingJobEntity {
    const now = new Date().toISOString();
    const id = TrainingIdVO.create(crypto.randomUUID());
    return new TrainingJobEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: TrainingIdVO,
    props: TrainingJobEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TrainingJobEntity {
    return new TrainingJobEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateProgress(progress: number): TrainingJobEntity {
    if (progress < 0 || progress > 100) {
      throw new Error('TrainingJob: progress must be in [0, 100]');
    }
    return new TrainingJobEntity(
      this.id,
      { ...this._toProps(), progress },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markCompleted(): TrainingJobEntity {
    const now = new Date();
    return new TrainingJobEntity(
      this.id,
      {
        ...this._toProps(),
        status: TrainingStatusVO.create('completed'),
        progress: 100,
        completedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  markFailed(error: string): TrainingJobEntity {
    const now = new Date();
    return new TrainingJobEntity(
      this.id,
      {
        ...this._toProps(),
        status: TrainingStatusVO.create('failed'),
        errorMessage: error,
        completedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  isRunning(): boolean {
    return this._status.isRunning();
  }

  getDurationMs(): number {
    if (!this._startedAt || !this._completedAt) return 0;
    return this._completedAt.getTime() - this._startedAt.getTime();
  }

  get type(): TrainingTypeVO { return this._type; }
  get status(): TrainingStatusVO { return this._status; }
  get progress(): number { return this._progress; }
  get startedAt(): Date | null { return this._startedAt; }
  get completedAt(): Date | null { return this._completedAt; }
  get errorMessage(): string | null { return this._errorMessage; }

  private _toProps(): TrainingJobEntityProps {
    return {
      type: this._type,
      status: this._status,
      progress: this._progress,
      startedAt: this._startedAt,
      completedAt: this._completedAt,
      errorMessage: this._errorMessage,
    };
  }
}
