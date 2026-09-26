import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyDriftDetectedCommand extends BaseSagaCommand {
  readonly type = 'ai.saga.notify-drift-detected';
  constructor(public readonly target: string, public readonly severity: string) { super(); }
}
