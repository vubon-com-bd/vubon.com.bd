import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ValidatePromotionCommand } from './validate-promotion.command';
import type { PromotionServiceInterface } from '../../services/interfaces/promotion.service.interface';

@CommandHandler(ValidatePromotionCommand)
export class ValidatePromotionHandler
  extends BaseCommandHandler<ValidatePromotionCommand, boolean>
  implements ICommandHandler<ValidatePromotionCommand>
{
  readonly commandType = 'marketing.promotion.validate';

  constructor(private readonly promotionService: PromotionServiceInterface) {
    super();
  }

  async execute(command: ValidatePromotionCommand): Promise<boolean> {
    return this.promotionService.validate({
      code: command.code,
      userId: command.userId,
      orderAmount: command.orderAmount,
    });
  }
}
