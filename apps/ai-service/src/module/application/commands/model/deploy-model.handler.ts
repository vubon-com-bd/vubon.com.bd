import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeployModelCommand } from './deploy-model.command';
import type { ModelServiceInterface } from '../../services/interfaces/model.service.interface';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@CommandHandler(DeployModelCommand)
export class DeployModelHandler
  extends BaseCommandHandler<DeployModelCommand, ModelResponseDTO>
  implements ICommandHandler<DeployModelCommand>
{
  readonly commandType = 'ai.model.deploy';

  constructor(
    private readonly modelService: ModelServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeployModelCommand): Promise<ModelResponseDTO> {
    return this.modelService.deploy(command.input);
  }
}
