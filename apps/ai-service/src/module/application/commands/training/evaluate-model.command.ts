import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { EvaluateModelRequestDTO } from '../../dtos/requests/training/evaluate-model.dto';

export class EvaluateModelCommand extends BaseCommand {
  readonly type = 'ai.training.evaluate';

  constructor(
    public readonly input: EvaluateModelRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
