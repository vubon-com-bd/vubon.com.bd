import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';
import { ModelNameVO } from '../value-objects/primitives/model-name.vo';
import { ModelVersionVO } from '../value-objects/primitives/model-version.vo';
import { ModelStatusVO } from '../value-objects/primitives/model-status.vo';
import { ModelTypeVO } from '../value-objects/primitives/model-type.vo';
import { ModelProviderIdVO } from '../value-objects/primitives/model-provider-id.vo';
import { ProviderEndpointVO } from '../value-objects/primitives/provider-endpoint.vo';
import { ModelMetadataVO } from '../value-objects/composites/model-metadata.vo';
import { ModelMetricsVO } from '../value-objects/composites/model-metrics.vo';

export interface ModelEntityProps {
  readonly name: ModelNameVO;
  readonly modelVersion: ModelVersionVO;
  readonly status: ModelStatusVO;
  readonly type: ModelTypeVO;
  readonly providerId: ModelProviderIdVO;
  readonly endpoint: ProviderEndpointVO | null;
  readonly description: string | null;
  readonly metadata: ModelMetadataVO | null;
  readonly metrics: ModelMetricsVO | null;
}

export class ModelEntity extends AggregateRoot<ModelIdVO> {
  private readonly _name: ModelNameVO;
  private readonly _modelVersion: ModelVersionVO;
  private readonly _status: ModelStatusVO;
  private readonly _type: ModelTypeVO;
  private readonly _providerId: ModelProviderIdVO;
  private readonly _endpoint: ProviderEndpointVO | null;
  private readonly _description: string | null;
  private readonly _metadata: ModelMetadataVO | null;
  private readonly _metrics: ModelMetricsVO | null;

  private constructor(
    id: ModelIdVO,
    props: ModelEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._modelVersion = props.modelVersion;
    this._status = props.status;
    this._type = props.type;
    this._providerId = props.providerId;
    this._endpoint = props.endpoint;
    this._description = props.description;
    this._metadata = props.metadata;
    this._metrics = props.metrics;
  }

  static create(props: ModelEntityProps): ModelEntity {
    const now = new Date().toISOString();
    const id = ModelIdVO.create(crypto.randomUUID());
    return new ModelEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ModelIdVO,
    props: ModelEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ModelEntity {
    return new ModelEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeStatus(status: ModelStatusVO): ModelEntity {
    return new ModelEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  deploy(): ModelEntity {
    if (!this.canDeploy()) {
      throw new Error('Model cannot be deployed: status or metrics not ready');
    }
    return this.changeStatus(ModelStatusVO.create('deployed'));
  }

  deprecate(): ModelEntity {
    return this.changeStatus(ModelStatusVO.create('deprecated'));
  }

  canDeploy(): boolean {
    return (
      this._status.canDeploy() &&
      this._metrics?.isProductionReady() === true &&
      this._endpoint !== null
    );
  }

  get name(): ModelNameVO { return this._name; }
  get modelVersion(): ModelVersionVO { return this._modelVersion; }
  get status(): ModelStatusVO { return this._status; }
  get type(): ModelTypeVO { return this._type; }
  get providerId(): ModelProviderIdVO { return this._providerId; }
  get endpoint(): ProviderEndpointVO | null { return this._endpoint; }
  get description(): string | null { return this._description; }
  get metadata(): ModelMetadataVO | null { return this._metadata; }
  get metrics(): ModelMetricsVO | null { return this._metrics; }

  private _toProps(): ModelEntityProps {
    return {
      name: this._name,
      modelVersion: this._modelVersion,
      status: this._status,
      type: this._type,
      providerId: this._providerId,
      endpoint: this._endpoint,
      description: this._description,
      metadata: this._metadata,
      metrics: this._metrics,
    };
  }
}
