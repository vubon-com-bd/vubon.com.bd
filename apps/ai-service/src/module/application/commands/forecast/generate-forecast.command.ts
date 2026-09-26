import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { GenerateForecastRequestDTO } from '../../dtos/requests/forecast/generate-forecast.dto';

export class GenerateForecastCommand extends BaseCommand {
  readonly type = 'ai.forecast.generate';
  constructor(public readonly input: GenerateForecastRequestDTO, public readonly userId: string) { super(); }
}
