import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyTrainingCompletedCommand extends BaseSagaCommand {
  readonly type = 'ai.saga.notify-training-completed';
  constructor(public readonly trainingId: string, public readonly modelId: string) { super(); }
}
