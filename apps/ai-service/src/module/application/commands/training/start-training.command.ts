import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { StartTrainingRequestDTO } from '../../dtos/requests/training/start-training.dto';

export class StartTrainingCommand extends BaseCommand {
  readonly type = 'ai.training.start';

  constructor(
    public readonly input: StartTrainingRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
