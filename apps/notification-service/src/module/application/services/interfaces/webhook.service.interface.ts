import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { WebhookEntity } from '../../../domain/entities/webhook.entity';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto';

export interface WebhookServiceInterface
  extends BaseServiceInterface<WebhookEntity, string> {
  findById(id: string): Promise<WebhookResponseDTO | null>;
  findByUser(userId: string): Promise<readonly WebhookResponseDTO[]>;
  findActive(): Promise<readonly WebhookResponseDTO[]>;
}
