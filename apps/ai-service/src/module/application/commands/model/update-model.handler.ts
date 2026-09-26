import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateModelCommand } from './update-model.command';
import type { ModelServiceInterface } from '../../services/interfaces/model.service.interface';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@CommandHandler(UpdateModelCommand)
export class UpdateModelHandler
  extends BaseCommandHandler<UpdateModelCommand, ModelResponseDTO>
  implements ICommandHandler<UpdateModelCommand>
{
  readonly commandType = 'ai.model.update';

  constructor(
    private readonly modelService: ModelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateModelCommand): Promise<ModelResponseDTO> {
    return this.modelService.update(command.modelId, command.input);
  }
}
