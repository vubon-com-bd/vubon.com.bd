import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RequestPayoutCommand } from './request-payout.command';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorPayoutEntity } from '../../../domain/entities/vendor-payout.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { PayoutAmountVO } from '../../../domain/value-objects/primitives/payout-amount.vo';
import { PayoutStatusVO } from '../../../domain/value-objects/primitives/payout-status.vo';
import { BankAccountIdVO } from '../../../domain/value-objects/primitives/bank-account-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { PayoutResponseDto } from '../../dtos/responses/payout-response.dto';

@CommandHandler(RequestPayoutCommand)
export class RequestPayoutHandler
  extends BaseCommandHandler<RequestPayoutCommand, PayoutResponseDto>
  implements ICommandHandler<RequestPayoutCommand>
{
  readonly commandType = 'vendor.payout.request';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly payoutRepo: VendorPayoutRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RequestPayoutCommand): Promise<PayoutResponseDto> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);

    const entity = VendorPayoutEntity.create({
      vendorId,
      bankAccountId: BankAccountIdVO.create(command.bankAccountId),
      amount: PayoutAmountVO.create(command.amount, command.currency),
      status: PayoutStatusVO.create('pending'),
      requestedAt: new Date(),
      processedAt: null,
      failureReason: null,
    });

    await this.payoutRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      bankAccountId: entity.bankAccountId.value,
      amount: entity.amount.amount,
      currency: entity.amount.currency,
      status: entity.status.value,
      requestedAt: entity.requestedAt.toISOString(),
      processedAt: entity.processedAt?.toISOString() ?? null,
      failureReason: entity.failureReason,
    };
  }
}
