import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { DigestEntity } from '../../domain/entities/digest.entity';
import type { DigestResponseDTO } from '../dtos/responses/digest-response.dto';

export class DigestMapper extends BaseMapper<DigestEntity, DigestResponseDTO> {
  toTarget(source: DigestEntity): DigestResponseDTO {
    return {
      id: source.id.value,
      userId: source.userId.value,
      type: source.type.value,
      frequency: source.period.value,
      status: source.status.value,
      scheduledAt: source.scheduledAt.toISOString(),
      sentAt: source.sentAt?.toISOString() ?? null,
      itemCount: 0,
    };
  }

  toSource(target: DigestResponseDTO): DigestEntity {
    void target;
    throw new Error('DigestMapper.toSource not supported');
  }
}
