import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrackConversionCommand } from './track-conversion.command';
import type { AffiliateCommissionServiceInterface } from '../../services/interfaces/affiliate-commission.service.interface';

@CommandHandler(TrackConversionCommand)
export class TrackConversionHandler
  extends BaseCommandHandler<TrackConversionCommand, void>
  implements ICommandHandler<TrackConversionCommand>
{
  readonly commandType = 'marketing.affiliate.track-conversion';

  constructor(private readonly commissionService: AffiliateCommissionServiceInterface) {
    super();
  }

  async execute(command: TrackConversionCommand): Promise<void> {
    await this.commissionService.trackConversion({
      affiliateId: command.affiliateId,
      orderId: command.orderId,
      orderAmount: command.orderAmount,
    });
  }
}
