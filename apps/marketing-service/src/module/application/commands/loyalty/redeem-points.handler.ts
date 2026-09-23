import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RedeemPointsCommand } from './redeem-points.command';
import type { LoyaltyServiceInterface } from '../../services/interfaces/loyalty.service.interface';
import type { LoyaltyResponseDTO } from '../../dtos/responses/loyalty-response.dto';

@CommandHandler(RedeemPointsCommand)
export class RedeemPointsHandler
  extends BaseCommandHandler<RedeemPointsCommand, LoyaltyResponseDTO>
  implements ICommandHandler<RedeemPointsCommand>
{
  readonly commandType = 'marketing.loyalty.redeem-points';

  constructor(private readonly loyaltyService: LoyaltyServiceInterface) {
    super();
  }

  async execute(command: RedeemPointsCommand): Promise<LoyaltyResponseDTO> {
    return this.loyaltyService.redeemPoints(command.userId, command.points);
  }
}
