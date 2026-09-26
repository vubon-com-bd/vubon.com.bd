import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';
import { ModelMetricsVO } from '../value-objects/composites/model-metrics.vo';

export interface ModelMetricsEntityProps {
  readonly modelId: ModelIdVO;
  readonly metrics: ModelMetricsVO;
}

export class ModelMetricsEntity extends BaseEntity<ModelIdVO> {
  private readonly _modelId: ModelIdVO;
  private readonly _metrics: ModelMetricsVO;

  private constructor(
    id: ModelIdVO,
    props: ModelMetricsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._modelId = props.modelId;
    this._metrics = props.metrics;
  }

  static create(props: ModelMetricsEntityProps): ModelMetricsEntity {
    const now = new Date().toISOString();
    return new ModelMetricsEntity(props.modelId, props, now, now, null);
  }

  static reconstitute(
    id: ModelIdVO,
    props: ModelMetricsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ModelMetricsEntity {
    return new ModelMetricsEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get modelId(): ModelIdVO { return this._modelId; }
  get metrics(): ModelMetricsVO { return this._metrics; }

  isProductionReady(): boolean {
    return this._metrics.isProductionReady();
  }
}
