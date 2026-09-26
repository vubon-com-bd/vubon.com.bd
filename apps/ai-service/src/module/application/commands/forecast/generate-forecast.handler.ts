import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateForecastCommand } from './generate-forecast.command';
import type { ForecastServiceInterface } from '../../services/interfaces/forecast.service.interface';
import type { ForecastResponseDTO } from '../../dtos/responses/forecast-response.dto';

@CommandHandler(GenerateForecastCommand)
export class GenerateForecastHandler
  extends BaseCommandHandler<GenerateForecastCommand, ForecastResponseDTO>
  implements ICommandHandler<GenerateForecastCommand>
{
  readonly commandType = 'ai.forecast.generate';
  constructor(
    private readonly forecastService: ForecastServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: GenerateForecastCommand): Promise<ForecastResponseDTO> {
    return this.forecastService.generate(command.input);
  }
}
