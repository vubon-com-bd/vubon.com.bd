import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { GuestCartServiceInterface } from '../interfaces/guest-cart.service.interface';
import type { GuestCartRepository } from '../../../domain/repositories/guest-cart.repository.interface';
import { GuestCartEntity } from '../../../domain/entities/guest-cart.entity';
import { GuestTokenVO } from '../../../domain/value-objects/primitives/guest-token.vo';
import type { GuestCartResponseDTO } from '../../dtos/responses/guest-cart-response.dto';

@Injectable()
export class GuestCartService
  extends BaseService<GuestCartEntity, string>
  implements GuestCartServiceInterface
{
  readonly name = 'GuestCartService';

  constructor(
    @Inject('GuestCartRepository')
    private readonly guestRepo: GuestCartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByToken(token: string): Promise<GuestCartResponseDTO | null> {
    const entity = await this.guestRepo.findByToken(GuestTokenVO.create(token));
    if (!entity) return null;
    return {
      guestCartId: entity.id.value,
      cartId: entity.cartId.value,
      token: entity.token.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      expiresAt: entity.expiresAt.toISOString(),
    };
  }
}
