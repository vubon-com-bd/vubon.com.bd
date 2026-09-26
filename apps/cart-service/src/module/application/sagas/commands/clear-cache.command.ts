import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class ClearCacheCommand extends BaseSagaCommand {
  readonly type = 'saga.clear-cache';
  constructor(public readonly cartId: string) { super(); }
}
