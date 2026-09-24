import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ComputeAttributionCommand } from './compute-attribution.command';
import type { AttributionServiceInterface } from '../../services/interfaces/attribution.service.interface';
import type { AttributionResponseDTO } from '../../dtos/responses';

@CommandHandler(ComputeAttributionCommand)
export class ComputeAttributionHandler
  extends BaseCommandHandler<ComputeAttributionCommand, AttributionResponseDTO>
  implements ICommandHandler<ComputeAttributionCommand>
{
  readonly commandType = 'analytics.attribution.compute';

  constructor(private readonly attributionService: AttributionServiceInterface) {
    super();
  }

  async execute(command: ComputeAttributionCommand): Promise<AttributionResponseDTO> {
    return this.attributionService.compute({
      conversionId: command.conversionId,
      model: command.model,
      touchpoints: [...command.touchpoints],
      conversionValue: command.conversionValue,
    });
  }
}
