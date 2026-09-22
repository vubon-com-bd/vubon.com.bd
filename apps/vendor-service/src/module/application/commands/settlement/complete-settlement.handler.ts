import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteSettlementCommand } from './complete-settlement.command';
import type { VendorSettlementRepository } from '../../../domain/repositories/vendor-settlement.repository.interface';
import { SettlementIdVO } from '../../../domain/value-objects/primitives/settlement-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { SettlementResponseDto } from '../../dtos/responses/settlement-response.dto';

@CommandHandler(CompleteSettlementCommand)
export class CompleteSettlementHandler
  extends BaseCommandHandler<CompleteSettlementCommand, SettlementResponseDto>
  implements ICommandHandler<CompleteSettlementCommand>
{
  readonly commandType = 'vendor.settlement.complete';

  constructor(
    private readonly settlementRepo: VendorSettlementRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CompleteSettlementCommand): Promise<SettlementResponseDto> {
    const settlement = await this.settlementRepo.findById(
      SettlementIdVO.create(command.settlementId),
    );
    if (!settlement) {
      throw new VendorNotFoundAppError(command.settlementId);
    }

    const completed = settlement.complete();
    await this.settlementRepo.save(completed);

    const events = completed.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: completed.id.value,
      vendorId: completed.vendorId.value,
      status: completed.status.value,
      totalAmount: completed.totalAmount.amount,
      commissionAmount: completed.commissionAmount.amount,
      netAmount: completed.netAmount.amount,
      currency: completed.totalAmount.currency,
      periodStart: completed.periodStart.toISOString(),
      periodEnd: completed.periodEnd.toISOString(),
      settledAt: completed.settledAt?.toISOString() ?? null,
    };
  }
}
