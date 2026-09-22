import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SubscriptionEntity } from '../../../domain/entities/subscription.entity';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto';

export interface SubscriptionServiceInterface
  extends BaseServiceInterface<SubscriptionEntity, string> {
  listActiveByUser(userId: string): Promise<readonly SubscriptionResponseDTO[]>;
  findById(subscriptionId: string): Promise<SubscriptionResponseDTO | null>;
}
