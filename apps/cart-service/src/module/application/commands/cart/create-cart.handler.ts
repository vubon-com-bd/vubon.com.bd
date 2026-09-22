import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateCartCommand } from './create-cart.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartEntity } from '../../../domain/entities/cart.entity';
import { CartTypeVO } from '../../../domain/value-objects/primitives/cart-type.vo';
import { CartStatusVO } from '../../../domain/value-objects/primitives/cart-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(CreateCartCommand)
export class CreateCartHandler
  extends BaseCommandHandler<CreateCartCommand, CartResponseDTO>
  implements ICommandHandler<CreateCartCommand>
{
  readonly commandType = 'cart.create';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateCartCommand): Promise<CartResponseDTO> {
    if (command.userId) {
      const existing = await this.cartRepo.findActiveByUser(
        UserIdVO.create(command.userId),
      );
      if (existing) {
        throw new CartOperationFailedError('active cart already exists');
      }
    }

    const entity = CartEntity.create({
      userId: command.userId ? UserIdVO.create(command.userId) : null,
      type: CartTypeVO.create(command.type2),
      status: CartStatusVO.create('active'),
      itemCount: 0,
      subtotal: 0,
      discountTotal: 0,
      taxTotal: 0,
      shippingTotal: 0,
      grandTotal: 0,
      currency: command.currency,
    });

    await this.cartRepo.save(entity);
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return this.toDTO(entity);
  }

  private toDTO(entity: CartEntity): CartResponseDTO {
    return {
      success: true,
      cart: {
        id: entity.id.value,
        userId: entity.userId?.value,
        type: entity.type.value,
        status: entity.status.value,
        itemCount: entity.itemCount,
        subtotal: entity.subtotal,
        discountTotal: entity.discountTotal,
        taxTotal: entity.taxTotal,
        shippingTotal: entity.shippingTotal,
        grandTotal: entity.grandTotal,
        currency: entity.currency,
        items: [],
      },
    };
  }
}
