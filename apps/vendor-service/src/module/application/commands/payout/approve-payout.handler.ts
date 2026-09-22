import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApprovePayoutCommand } from './approve-payout.command';
import type { VendorPayoutRepository } from '../../../domain/repositories/vendor-payout.repository.interface';
import { PayoutIdVO } from '../../../domain/value-objects/primitives/payout-id.vo';
import { PayoutProcessingFailedError } from '../../errors/payout.errors';
import type { PayoutResponseDto } from '../../dtos/responses/payout-response.dto';

@CommandHandler(ApprovePayoutCommand)
export class ApprovePayoutHandler
  extends BaseCommandHandler<ApprovePayoutCommand, PayoutResponseDto>
  implements ICommandHandler<ApprovePayoutCommand>
{
  readonly commandType = 'vendor.payout.approve';

  constructor(
    private readonly payoutRepo: VendorPayoutRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ApprovePayoutCommand): Promise<PayoutResponseDto> {
    const payout = await this.payoutRepo.findById(
      PayoutIdVO.create(command.payoutId),
    );
    if (!payout) {
      throw new PayoutProcessingFailedError('payout not found');
    }
    void this.eventBus;
    throw new Error('approve-payout orchestration not yet wired');
  }
}
