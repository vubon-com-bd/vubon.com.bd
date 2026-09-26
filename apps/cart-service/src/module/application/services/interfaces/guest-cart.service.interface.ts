import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { GuestCartEntity } from '../../../domain/entities/guest-cart.entity';
import type { GuestCartResponseDTO } from '../../dtos/responses/guest-cart-response.dto';

export interface GuestCartServiceInterface
  extends BaseServiceInterface<GuestCartEntity, string> {
  findByToken(token: string): Promise<GuestCartResponseDTO | null>;
}
