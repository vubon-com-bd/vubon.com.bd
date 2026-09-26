import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';
import { ModelArtifactVO } from '../value-objects/composites/model-artifact.vo';

export interface ModelArtifactEntityProps {
  readonly modelId: ModelIdVO;
  readonly artifact: ModelArtifactVO;
}

export class ModelArtifactEntity extends BaseEntity<string> {
  private readonly _modelId: ModelIdVO;
  private readonly _artifact: ModelArtifactVO;

  private constructor(
    id: string,
    props: ModelArtifactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._modelId = props.modelId;
    this._artifact = props.artifact;
  }

  static create(props: ModelArtifactEntityProps): ModelArtifactEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new ModelArtifactEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: ModelArtifactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ModelArtifactEntity {
    return new ModelArtifactEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get modelId(): ModelIdVO { return this._modelId; }
  get artifact(): ModelArtifactVO { return this._artifact; }
}
