import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class TriggerRetrainingCommand extends BaseSagaCommand {
  readonly type = 'ai.saga.trigger-retraining';
  constructor(public readonly target: string) { super(); }
}
