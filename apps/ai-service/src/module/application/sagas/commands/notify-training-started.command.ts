import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyTrainingStartedCommand extends BaseSagaCommand {
  readonly type = 'ai.saga.notify-training-started';
  constructor(public readonly trainingId: string, public readonly modelId: string) { super(); }
}
