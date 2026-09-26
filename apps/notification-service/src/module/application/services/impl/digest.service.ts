import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DigestServiceInterface } from '../interfaces/digest.service.interface';
import type { DigestRepository } from '../../../domain/repositories/digest.repository.interface';
import { DigestEntity } from '../../../domain/entities/digest.entity';
import { DigestIdVO } from '../../../domain/value-objects/primitives/digest-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { DigestResponseDTO } from '../../dtos/responses/digest-response.dto';

@Injectable()
export class DigestService
  extends BaseService<DigestEntity, string>
  implements DigestServiceInterface
{
  readonly name = 'DigestService';

  constructor(private readonly repo: DigestRepository) {
    super();
  }

  async findById(id: string): Promise<DigestResponseDTO | null> {
    const entity = await this.repo.findById(DigestIdVO.create(id));
    return entity ? this.toDTO(entity) : null;
  }

  async findByUser(userId: string): Promise<readonly DigestResponseDTO[]> {
    const entities = await this.repo.findByUser(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async send(digestId: string): Promise<DigestResponseDTO> {
    const entity = await this.repo.findById(DigestIdVO.create(digestId));
    if (!entity) {
      throw new Error(`Digest not found: ${digestId}`);
    }
    const sent = entity.markAsSent();
    await this.repo.save(sent);
    return this.toDTO(sent);
  }

  private toDTO(entity: DigestEntity): DigestResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      frequency: entity.period.value,
      status: entity.status.value,
      scheduledAt: entity.scheduledAt.toISOString(),
      sentAt: entity.sentAt?.toISOString() ?? null,
      itemCount: 0,
    };
  }
}
