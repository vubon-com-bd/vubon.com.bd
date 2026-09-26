import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RankProductsCommand } from './rank-products.command';
import type { RankingServiceInterface } from '../../services/interfaces/ranking.service.interface';
import type { RankingResponseDTO } from '../../dtos/responses/ranking-response.dto';

@CommandHandler(RankProductsCommand)
export class RankProductsHandler
  extends BaseCommandHandler<RankProductsCommand, RankingResponseDTO>
  implements ICommandHandler<RankProductsCommand>
{
  readonly commandType = 'ai.ranking.rank-products';
  constructor(
    private readonly rankingService: RankingServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: RankProductsCommand): Promise<RankingResponseDTO> {
    return this.rankingService.rank(command.input);
  }
}
