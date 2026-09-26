import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyModelDeployedCommand extends BaseSagaCommand {
  readonly type = 'ai.saga.notify-model-deployed';
  constructor(public readonly modelId: string) { super(); }
}
