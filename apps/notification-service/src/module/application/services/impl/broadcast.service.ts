import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { BroadcastServiceInterface } from '../interfaces/broadcast.service.interface';
import type { BroadcastRepository } from '../../../domain/repositories/broadcast.repository.interface';
import { BroadcastEntity } from '../../../domain/entities/broadcast.entity';
import { BroadcastIdVO } from '../../../domain/value-objects/primitives/broadcast-id.vo';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto';

@Injectable()
export class BroadcastService
  extends BaseService<BroadcastEntity, string>
  implements BroadcastServiceInterface
{
  readonly name = 'BroadcastService';

  constructor(private readonly repo: BroadcastRepository) {
    super();
  }

  async findById(id: string): Promise<BroadcastResponseDTO | null> {
    const entity = await this.repo.findById(BroadcastIdVO.create(id));
    return entity ? this.toDTO(entity) : null;
  }

  async findActive(): Promise<readonly BroadcastResponseDTO[]> {
    const entities = await this.repo.findActive();
    return entities.map((e) => this.toDTO(e));
  }

  async start(broadcastId: string): Promise<BroadcastResponseDTO> {
    const entity = await this.repo.findById(BroadcastIdVO.create(broadcastId));
    if (!entity) {
      throw new Error(`Broadcast not found: ${broadcastId}`);
    }
    const started = entity.start();
    await this.repo.save(started);
    return this.toDTO(started);
  }

  async cancel(broadcastId: string, reason?: string): Promise<void> {
    void reason;
    const entity = await this.repo.findById(BroadcastIdVO.create(broadcastId));
    if (!entity) {
      throw new Error(`Broadcast not found: ${broadcastId}`);
    }
    const cancelled = entity.complete();
    await this.repo.save(cancelled);
  }

  private toDTO(entity: BroadcastEntity): BroadcastResponseDTO {
    return {
      id: entity.id.value,
      type: entity.type.value,
      status: entity.status.value,
      target: entity.audience.value,
      content: entity.content,
      scheduledAt: entity.scheduledAt?.toISOString() ?? null,
      startedAt: entity.startedAt?.toISOString() ?? null,
      completedAt: entity.completedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
    };
  }
}
