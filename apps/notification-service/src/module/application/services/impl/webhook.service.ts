import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { WebhookServiceInterface } from '../interfaces/webhook.service.interface';
import type { WebhookRepository } from '../../../domain/repositories/webhook.repository.interface';
import { WebhookEntity } from '../../../domain/entities/webhook.entity';
import { WebhookIdVO } from '../../../domain/value-objects/primitives/webhook-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto';

@Injectable()
export class WebhookService
  extends BaseService<WebhookEntity, string>
  implements WebhookServiceInterface
{
  readonly name = 'WebhookService';

  constructor(private readonly repo: WebhookRepository) {
    super();
  }

  async findById(id: string): Promise<WebhookResponseDTO | null> {
    const entity = await this.repo.findById(WebhookIdVO.create(id));
    return entity ? this.toDTO(entity) : null;
  }

  async findByUser(userId: string): Promise<readonly WebhookResponseDTO[]> {
    const entities = await this.repo.findByUser(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async findActive(): Promise<readonly WebhookResponseDTO[]> {
    const entities = await this.repo.findActive();
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: WebhookEntity): WebhookResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      url: entity.url.value,
      status: entity.status.value,
      events: entity.events,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
