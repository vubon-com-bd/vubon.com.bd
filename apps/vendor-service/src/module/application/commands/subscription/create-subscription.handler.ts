import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSubscriptionCommand } from './create-subscription.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorSubscriptionRepository } from '../../../domain/repositories/vendor-subscription.repository.interface';
import { VendorSubscriptionEntity } from '../../../domain/entities/vendor-subscription.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { SubscriptionPlanVO } from '../../../domain/value-objects/primitives/subscription-plan.vo';
import { PayoutAmountVO } from '../../../domain/value-objects/primitives/payout-amount.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { SubscriptionResponseDto } from '../../dtos/responses/subscription-response.dto';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  extends BaseCommandHandler<CreateSubscriptionCommand, SubscriptionResponseDto>
  implements ICommandHandler<CreateSubscriptionCommand>
{
  readonly commandType = 'vendor.subscription.create';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly subscriptionRepo: VendorSubscriptionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateSubscriptionCommand): Promise<SubscriptionResponseDto> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);

    const now = new Date();
    const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const entity = VendorSubscriptionEntity.create({
      vendorId,
      plan: SubscriptionPlanVO.create(command.plan),
      price: PayoutAmountVO.create(0, 'BDT'),
      startedAt: now,
      expiresAt: expires,
      autoRenew: command.autoRenew ?? true,
      cancelledAt: null,
    });

    await this.subscriptionRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      plan: entity.plan.value,
      price: entity.price.amount,
      currency: entity.price.currency,
      startedAt: entity.startedAt.toISOString(),
      expiresAt: entity.expiresAt.toISOString(),
      autoRenew: entity.autoRenew,
      cancelledAt: entity.cancelledAt?.toISOString() ?? null,
      isActive: entity.isActive,
    };
  }
}
