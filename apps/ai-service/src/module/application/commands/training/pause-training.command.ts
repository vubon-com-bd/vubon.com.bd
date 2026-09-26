import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PauseTrainingCommand extends BaseCommand {
  readonly type = 'ai.training.pause';

  constructor(
    public readonly trainingId: string,
    public readonly userId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
