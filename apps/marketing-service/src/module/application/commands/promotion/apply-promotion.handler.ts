import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApplyPromotionCommand } from './apply-promotion.command';
import type { PromotionServiceInterface } from '../../services/interfaces/promotion.service.interface';

@CommandHandler(ApplyPromotionCommand)
export class ApplyPromotionHandler
  extends BaseCommandHandler<ApplyPromotionCommand, number>
  implements ICommandHandler<ApplyPromotionCommand>
{
  readonly commandType = 'marketing.promotion.apply';

  constructor(private readonly promotionService: PromotionServiceInterface) {
    super();
  }

  async execute(command: ApplyPromotionCommand): Promise<number> {
    return this.promotionService.apply({
      code: command.code,
      userId: command.userId,
      orderAmount: command.orderAmount,
    });
  }
}
