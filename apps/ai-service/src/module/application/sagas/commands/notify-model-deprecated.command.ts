import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyModelDeprecatedCommand extends BaseSagaCommand {
  readonly type = 'ai.saga.notify-model-deprecated';
  constructor(public readonly modelId: string) { super(); }
}
