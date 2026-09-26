import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ProcessPayoutCommand } from './process-payout.command';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';
import { PayoutIdVO } from '../../../domain/value-objects/primitives/payout-id.vo';
import { PayoutProcessingFailedError } from '../../errors/payout.errors';
import type { PayoutResponseDto } from '../../dtos/responses/payout-response.dto';

@CommandHandler(ProcessPayoutCommand)
export class ProcessPayoutHandler
  extends BaseCommandHandler<ProcessPayoutCommand, PayoutResponseDto>
  implements ICommandHandler<ProcessPayoutCommand>
{
  readonly commandType = 'vendor.payout.process';

  constructor(
    private readonly payoutRepo: VendorPayoutRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ProcessPayoutCommand): Promise<PayoutResponseDto> {
    const payout = await this.payoutRepo.findById(
      PayoutIdVO.create(command.payoutId),
    );
    if (!payout) {
      throw new PayoutProcessingFailedError('payout not found');
    }
    void command.transactionRef;
    void command.failureReason;
    void this.eventBus;
    throw new Error('process-payout orchestration not yet wired');
  }
}
