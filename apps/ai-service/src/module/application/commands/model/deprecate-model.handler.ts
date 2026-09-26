import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeprecateModelCommand } from './deprecate-model.command';
import type { ModelServiceInterface } from '../../services/interfaces/model.service.interface';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@CommandHandler(DeprecateModelCommand)
export class DeprecateModelHandler
  extends BaseCommandHandler<DeprecateModelCommand, ModelResponseDTO>
  implements ICommandHandler<DeprecateModelCommand>
{
  readonly commandType = 'ai.model.deprecate';

  constructor(
    private readonly modelService: ModelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeprecateModelCommand): Promise<ModelResponseDTO> {
    return this.modelService.deprecate(command.input);
  }
}
