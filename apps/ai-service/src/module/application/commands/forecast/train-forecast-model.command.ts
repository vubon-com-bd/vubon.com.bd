import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { TrainForecastModelRequestDTO } from '../../dtos/requests/forecast/train-forecast-model.dto';

export class TrainForecastModelCommand extends BaseCommand {
  readonly type = 'ai.forecast.train-model';
  constructor(public readonly input: TrainForecastModelRequestDTO, public readonly userId: string) { super(); }
}
