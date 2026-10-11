import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ProcessBroadcastBatchCommand extends BaseCommand {
  readonly type = 'saga.broadcast.process_batch';
  constructor(
    public readonly broadcastId: string,
    public readonly batchSize: number,
  ) {
    super();
  }
}
