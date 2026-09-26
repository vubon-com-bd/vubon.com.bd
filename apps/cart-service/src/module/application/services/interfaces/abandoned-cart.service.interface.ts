import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AbandonedCartEntity } from '../../../domain/entities/abandoned-cart.entity';
import type { AbandonedCartResponseDTO } from '../../dtos/responses/abandoned-cart-response.dto';

export interface AbandonedCartServiceInterface
  extends BaseServiceInterface<AbandonedCartEntity, string> {
  listByUser(userId: string): Promise<readonly AbandonedCartResponseDTO[]>;
  findById(abandonedId: string): Promise<AbandonedCartResponseDTO | null>;
}
