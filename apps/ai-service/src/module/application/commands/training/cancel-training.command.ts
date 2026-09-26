import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelTrainingCommand extends BaseCommand {
  readonly type = 'ai.training.cancel';

  constructor(
    public readonly trainingId: string,
    public readonly reason: string,
    public readonly userId: string,
  ) {
    super();
  }
}
