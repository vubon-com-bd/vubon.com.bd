import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { IndexVectorCommand } from './index-vector.command';
import type { VectorServiceInterface } from '../../services/interfaces/vector.service.interface';

@CommandHandler(IndexVectorCommand)
export class IndexVectorHandler
  extends BaseCommandHandler<IndexVectorCommand, void>
  implements ICommandHandler<IndexVectorCommand>
{
  readonly commandType = 'ai.vector.index';
  constructor(
    private readonly vectorService: VectorServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: IndexVectorCommand): Promise<void> {
    await this.vectorService.index(command.input.vectorId, command.input.indexId);
  }
}
