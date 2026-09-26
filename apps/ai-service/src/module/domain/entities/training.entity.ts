import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TrainingIdVO } from '../value-objects/primitives/training-id.vo';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';
import { TrainingConfigVO } from '../value-objects/composites/training-config.vo';
import { TrainingJobVO } from '../value-objects/composites/training-job.vo';

export interface TrainingEntityProps {
  readonly modelId: ModelIdVO;
  readonly config: TrainingConfigVO;
  readonly job: TrainingJobVO;
}

export class TrainingEntity extends AggregateRoot<TrainingIdVO> {
  private readonly _modelId: ModelIdVO;
  private readonly _config: TrainingConfigVO;
  private readonly _job: TrainingJobVO;

  private constructor(
    id: TrainingIdVO,
    props: TrainingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._modelId = props.modelId;
    this._config = props.config;
    this._job = props.job;
  }

  static create(props: TrainingEntityProps): TrainingEntity {
    const now = new Date().toISOString();
    const id = TrainingIdVO.create(crypto.randomUUID());
    return new TrainingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: TrainingIdVO,
    props: TrainingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TrainingEntity {
    return new TrainingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  isRunning(): boolean {
    return this._job.isRunning();
  }

  get modelId(): ModelIdVO { return this._modelId; }
  get config(): TrainingConfigVO { return this._config; }
  get job(): TrainingJobVO { return this._job; }
}
