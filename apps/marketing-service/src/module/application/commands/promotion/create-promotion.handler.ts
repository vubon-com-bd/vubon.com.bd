import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreatePromotionCommand } from './create-promotion.command';
import type { PromotionServiceInterface } from '../../services/interfaces/promotion.service.interface';
import type { PromotionResponseDTO } from '../../dtos/responses/promotion-response.dto';

@CommandHandler(CreatePromotionCommand)
export class CreatePromotionHandler
  extends BaseCommandHandler<CreatePromotionCommand, PromotionResponseDTO>
  implements ICommandHandler<CreatePromotionCommand>
{
  readonly commandType = 'marketing.promotion.create';

  constructor(private readonly promotionService: PromotionServiceInterface) {
    super();
  }

  async execute(command: CreatePromotionCommand): Promise<PromotionResponseDTO> {
    return this.promotionService.create({
      name: command.name,
      code: command.code,
      type: command.promotionType,
      maxUsage: command.maxUsage,
      startDate: command.startDate,
      endDate: command.endDate,
    } as never);
  }
}
