import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ClearCacheCommand extends BaseCommand {
  readonly type = 'saga.cache.clear';
  constructor(public readonly cartId: string) { super(); }
}
