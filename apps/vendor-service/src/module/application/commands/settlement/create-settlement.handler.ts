import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSettlementCommand } from './create-settlement.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorSettlementRepository } from '../../../domain/repositories/vendor-settlement.repository.interface';
import { VendorSettlementEntity } from '../../../domain/entities/vendor-settlement.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { SettlementStatusVO } from '../../../domain/value-objects/primitives/settlement-status.vo';
import { PayoutAmountVO } from '../../../domain/value-objects/primitives/payout-amount.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { SettlementResponseDto } from '../../dtos/responses/settlement-response.dto';

@CommandHandler(CreateSettlementCommand)
export class CreateSettlementHandler
  extends BaseCommandHandler<CreateSettlementCommand, SettlementResponseDto>
  implements ICommandHandler<CreateSettlementCommand>
{
  readonly commandType = 'vendor.settlement.create';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly settlementRepo: VendorSettlementRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateSettlementCommand): Promise<SettlementResponseDto> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);

    const zero = PayoutAmountVO.create(0, 'BDT');
    const entity = VendorSettlementEntity.create({
      vendorId,
      status: SettlementStatusVO.create('pending'),
      totalAmount: zero,
      commissionAmount: zero,
      netAmount: zero,
      periodStart: new Date(command.periodStart),
      periodEnd: new Date(command.periodEnd),
      settledAt: null,
    });

    await this.settlementRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      totalAmount: entity.totalAmount.amount,
      commissionAmount: entity.commissionAmount.amount,
      netAmount: entity.netAmount.amount,
      currency: entity.totalAmount.currency,
      periodStart: entity.periodStart.toISOString(),
      periodEnd: entity.periodEnd.toISOString(),
      settledAt: entity.settledAt?.toISOString() ?? null,
    };
  }
}
