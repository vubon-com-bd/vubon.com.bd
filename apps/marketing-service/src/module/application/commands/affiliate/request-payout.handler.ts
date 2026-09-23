import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RequestPayoutCommand } from './request-payout.command';
import type { AffiliatePayoutServiceInterface } from '../../services/interfaces/affiliate-payout.service.interface';
import type { AffiliatePayoutResponseDTO } from '../../dtos/responses/affiliate-payout-response.dto';

@CommandHandler(RequestPayoutCommand)
export class RequestPayoutHandler
  extends BaseCommandHandler<RequestPayoutCommand, AffiliatePayoutResponseDTO>
  implements ICommandHandler<RequestPayoutCommand>
{
  readonly commandType = 'marketing.affiliate.request-payout';

  constructor(private readonly payoutService: AffiliatePayoutServiceInterface) {
    super();
  }

  async execute(command: RequestPayoutCommand): Promise<AffiliatePayoutResponseDTO> {
    return this.payoutService.request({
      affiliateId: command.affiliateId,
      amount: command.amount,
    });
  }
}
