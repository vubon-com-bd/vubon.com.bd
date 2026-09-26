import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateModelCommand } from './create-model.command';
import type { ModelServiceInterface } from '../../services/interfaces/model.service.interface';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@CommandHandler(CreateModelCommand)
export class CreateModelHandler
  extends BaseCommandHandler<CreateModelCommand, ModelResponseDTO>
  implements ICommandHandler<CreateModelCommand>
{
  readonly commandType = 'ai.model.create';

  constructor(
    private readonly modelService: ModelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateModelCommand): Promise<ModelResponseDTO> {
    return this.modelService.create(command.input);
  }
}
