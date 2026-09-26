import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectPayoutCommand } from './reject-payout.command';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';
import { PayoutIdVO } from '../../../domain/value-objects/primitives/payout-id.vo';
import { PayoutProcessingFailedError } from '../../errors/payout.errors';

@CommandHandler(RejectPayoutCommand)
export class RejectPayoutHandler
  extends BaseCommandHandler<RejectPayoutCommand, void>
  implements ICommandHandler<RejectPayoutCommand>
{
  readonly commandType = 'vendor.payout.reject';

  constructor(
    private readonly payoutRepo: VendorPayoutRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RejectPayoutCommand): Promise<void> {
    const payout = await this.payoutRepo.findById(
      PayoutIdVO.create(command.payoutId),
    );
    if (!payout) {
      throw new PayoutProcessingFailedError('payout not found');
    }
    void this.eventBus;
    throw new Error('reject-payout orchestration not yet wired');
  }
}
