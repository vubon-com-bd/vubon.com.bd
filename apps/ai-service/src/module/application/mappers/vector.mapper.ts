import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { VectorEntity } from '../../domain/entities/vector.entity';
import type { VectorResponseDTO } from '../dtos/responses/vector-response.dto';

export class VectorMapper extends BaseMapper<VectorEntity, VectorResponseDTO> {
  toTarget(source: VectorEntity): VectorResponseDTO {
    return {
      id: source.id.value,
      name: source.name.value,
      dimension: source.dimension.value,
      values: source.values,
      metadata: source.metadata,
      createdAt: source.createdAt,
    };
  }

  toSource(_target: VectorResponseDTO): VectorEntity {
    throw new Error('VectorMapper.toSource not supported');
  }
}
