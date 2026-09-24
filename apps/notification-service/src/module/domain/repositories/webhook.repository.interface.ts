import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { WebhookEntity } from '../entities/webhook.entity';
import { WebhookIdVO } from '../value-objects/primitives/webhook-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { WebhookTypeVO } from '../value-objects/primitives/webhook-type.vo';

export interface WebhookRepository extends BaseRepository<WebhookEntity, WebhookIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly WebhookEntity[]>;
  findActive(): Promise<readonly WebhookEntity[]>;
  findByType(type: WebhookTypeVO): Promise<readonly WebhookEntity[]>;
  countByUser(userId: UserIdVO): Promise<number>;
}
