import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EarnPointsCommand } from './earn-points.command';
import type { LoyaltyServiceInterface } from '../../services/interfaces/loyalty.service.interface';
import type { LoyaltyResponseDTO } from '../../dtos/responses/loyalty-response.dto';

@CommandHandler(EarnPointsCommand)
export class EarnPointsHandler
  extends BaseCommandHandler<EarnPointsCommand, LoyaltyResponseDTO>
  implements ICommandHandler<EarnPointsCommand>
{
  readonly commandType = 'marketing.loyalty.earn-points';

  constructor(private readonly loyaltyService: LoyaltyServiceInterface) {
    super();
  }

  async execute(command: EarnPointsCommand): Promise<LoyaltyResponseDTO> {
    return this.loyaltyService.earnPoints(command.userId, command.points);
  }
}
