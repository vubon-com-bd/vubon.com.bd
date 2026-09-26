import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { TrainingIdVO } from '../value-objects/primitives/training-id.vo';
import { TrainingConfigVO } from '../value-objects/composites/training-config.vo';

export interface TrainingConfigEntityProps {
  readonly trainingId: TrainingIdVO;
  readonly config: TrainingConfigVO;
}

export class TrainingConfigEntity extends BaseEntity<TrainingIdVO> {
  private readonly _trainingId: TrainingIdVO;
  private readonly _config: TrainingConfigVO;

  private constructor(
    id: TrainingIdVO,
    props: TrainingConfigEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._trainingId = props.trainingId;
    this._config = props.config;
  }

  static create(props: TrainingConfigEntityProps): TrainingConfigEntity {
    const now = new Date().toISOString();
    return new TrainingConfigEntity(props.trainingId, props, now, now, null);
  }

  static reconstitute(
    id: TrainingIdVO,
    props: TrainingConfigEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TrainingConfigEntity {
    return new TrainingConfigEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get trainingId(): TrainingIdVO { return this._trainingId; }
  get config(): TrainingConfigVO { return this._config; }
}
