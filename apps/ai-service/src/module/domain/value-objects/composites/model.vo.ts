import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ModelIdVO } from '../primitives/model-id.vo';
import { ModelNameVO } from '../primitives/model-name.vo';
import { ModelVersionVO } from '../primitives/model-version.vo';
import { ModelStatusVO } from '../primitives/model-status.vo';
import { ModelTypeVO } from '../primitives/model-type.vo';
import { ModelProviderIdVO } from '../primitives/model-provider-id.vo';
import { ProviderEndpointVO } from '../primitives/provider-endpoint.vo';
import { ModelMetadataVO } from './model-metadata.vo';
import { ModelMetricsVO } from './model-metrics.vo';

export interface ModelProps {
  readonly id: ModelIdVO;
  readonly name: ModelNameVO;
  readonly version: ModelVersionVO;
  readonly status: ModelStatusVO;
  readonly type: ModelTypeVO;
  readonly providerId: ModelProviderIdVO;
  readonly endpoint: ProviderEndpointVO | null;
  readonly description: string | null;
  readonly metadata: ModelMetadataVO | null;
  readonly metrics: ModelMetricsVO | null;
}

export class ModelVO extends BaseVO<ModelProps> {
  static create(props: ModelProps): ModelVO {
    return new ModelVO(props);
  }

  private constructor(props: ModelProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): ModelIdVO { return this.value.id; }
  get name(): ModelNameVO { return this.value.name; }
  get version(): ModelVersionVO { return this.value.version; }
  get status(): ModelStatusVO { return this.value.status; }
  get type(): ModelTypeVO { return this.value.type; }
  get providerId(): ModelProviderIdVO { return this.value.providerId; }
  get endpoint(): ProviderEndpointVO | null { return this.value.endpoint; }
  get description(): string | null { return this.value.description; }
  get metadata(): ModelMetadataVO | null { return this.value.metadata; }
  get metrics(): ModelMetricsVO | null { return this.value.metrics; }

  isDeployable(): boolean {
    return this.value.status.canDeploy() && this.value.metrics?.isProductionReady() === true;
  }
}
