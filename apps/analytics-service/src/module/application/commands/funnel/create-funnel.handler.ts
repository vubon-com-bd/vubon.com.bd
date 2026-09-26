import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateFunnelCommand } from './create-funnel.command';
import type { FunnelServiceInterface } from '../../services/interfaces/funnel.service.interface';
import type { FunnelResponseDTO } from '../../dtos/responses';

@CommandHandler(CreateFunnelCommand)
export class CreateFunnelHandler
  extends BaseCommandHandler<CreateFunnelCommand, FunnelResponseDTO>
  implements ICommandHandler<CreateFunnelCommand>
{
  readonly commandType = 'analytics.funnel.create';

  constructor(private readonly funnelService: FunnelServiceInterface) {
    super();
  }

  async execute(command: CreateFunnelCommand): Promise<FunnelResponseDTO> {
    return this.funnelService.create({
      name: command.name,
      steps: [...command.steps],
      ownerId: command.ownerId,
    });
  }
}
