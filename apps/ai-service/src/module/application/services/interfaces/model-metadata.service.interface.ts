import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ModelMetadataEntity } from '../../../domain/entities/model-metadata.entity';
import type { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';

export interface ModelMetadataServiceInterface
  extends BaseServiceInterface<ModelMetadataEntity, ModelIdVO> {
  findByModelId(modelId: string): Promise<ModelMetadataEntity | null>;
  upsert(modelId: string, metadata: Readonly<Record<string, unknown>>): Promise<void>;
}
