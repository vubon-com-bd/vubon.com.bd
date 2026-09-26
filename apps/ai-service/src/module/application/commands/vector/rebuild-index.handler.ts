import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RebuildIndexCommand } from './rebuild-index.command';
import type { VectorServiceInterface } from '../../services/interfaces/vector.service.interface';

@CommandHandler(RebuildIndexCommand)
export class RebuildIndexHandler
  extends BaseCommandHandler<RebuildIndexCommand, void>
  implements ICommandHandler<RebuildIndexCommand>
{
  readonly commandType = 'ai.vector.rebuild-index';
  constructor(
    private readonly vectorService: VectorServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: RebuildIndexCommand): Promise<void> {
    await this.vectorService.rebuildIndex(command.input.indexId, command.input.force);
  }
}
