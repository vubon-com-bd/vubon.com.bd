import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';
import { ModelMetadataVO } from '../value-objects/composites/model-metadata.vo';

export interface ModelMetadataEntityProps {
  readonly modelId: ModelIdVO;
  readonly metadata: ModelMetadataVO;
}

export class ModelMetadataEntity extends BaseEntity<ModelIdVO> {
  private readonly _modelId: ModelIdVO;
  private readonly _metadata: ModelMetadataVO;

  private constructor(
    id: ModelIdVO,
    props: ModelMetadataEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._modelId = props.modelId;
    this._metadata = props.metadata;
  }

  static create(props: ModelMetadataEntityProps): ModelMetadataEntity {
    const now = new Date().toISOString();
    return new ModelMetadataEntity(props.modelId, props, now, now, null);
  }

  static reconstitute(
    id: ModelIdVO,
    props: ModelMetadataEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ModelMetadataEntity {
    return new ModelMetadataEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get modelId(): ModelIdVO { return this._modelId; }
  get metadata(): ModelMetadataVO { return this._metadata; }
}
