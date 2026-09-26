import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { ModelEntity } from '../../domain/entities/model.entity';
import type { ModelResponseDTO } from '../dtos/responses/model-response.dto';

export class ModelMapper extends BaseMapper<ModelEntity, ModelResponseDTO> {
  toTarget(source: ModelEntity): ModelResponseDTO {
    return {
      id: source.id.value,
      name: source.name.value,
      version: source.modelVersion.value,
      status: source.status.value,
      type: source.type.value,
      providerId: source.providerId.value,
      endpoint: source.endpoint?.value ?? null,
      description: source.description,
    } as unknown as ModelResponseDTO;
  }

  toSource(_target: ModelResponseDTO): ModelEntity {
    throw new Error('ModelMapper.toSource not supported');
  }
}
